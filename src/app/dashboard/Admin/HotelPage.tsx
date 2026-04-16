import { useMemo, useState } from "react";
import { Hotel } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { hotelCategories, mockCities, mockHotels } from "./_data/mockData";
import type { HotelCategory, HotelItem } from "./_types/entities";
import DashboardPageHeader from "./_components/DashboardPageHeader";
import CrudRowActions from "./_components/CrudRowActions";
import DeleteConfirmDialog from "./_components/DeleteConfirmDialog";
import EntityFormDialog from "./_components/EntityFormDialog";
import SearchableSelect from "./_components/SearchableSelect";
import { createId } from "./_utils/createId";

type HotelFormState = {
  city: string;
  name: string;
  category: HotelCategory;
  price: string;
};

const initialForm: HotelFormState = {
  city: "",
  name: "",
  category: hotelCategories[0],
  price: "",
};

const HotelPage = () => {
  const [rows, setRows] = useState<HotelItem[]>(mockHotels);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [activeRow, setActiveRow] = useState<HotelItem | null>(null);
  const [formState, setFormState] = useState<HotelFormState>(initialForm);
  const [formError, setFormError] = useState("");

  const cityOptions = useMemo(
    () => mockCities.map((city) => ({ value: city.name, label: city.name })),
    []
  );

  const resetForm = () => {
    setFormState(initialForm);
    setFormError("");
  };

  const validate = () => {
    if (!formState.city || !formState.name.trim() || !formState.category || !formState.price) {
      setFormError("All fields are required.");
      return false;
    }

    const numericPrice = Number(formState.price);
    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
      setFormError("Price must be greater than 0.");
      return false;
    }

    setFormError("");
    return true;
  };

  const handleCreate = () => {
    if (!validate()) {
      return;
    }

    const newHotel: HotelItem = {
      id: createId("hotel"),
      city: formState.city,
      name: formState.name.trim(),
      category: formState.category,
      price: Number(formState.price),
    };

    setRows((currentRows) => [newHotel, ...currentRows]);
    setIsCreateOpen(false);
    resetForm();
  };

  const handleOpenEdit = (row: HotelItem) => {
    setActiveRow(row);
    setFormState({
      city: row.city,
      name: row.name,
      category: row.category,
      price: String(row.price),
    });
    setFormError("");
    setIsEditOpen(true);
  };

  const handleEdit = () => {
    if (!activeRow || !validate()) {
      return;
    }

    setRows((currentRows) =>
      currentRows.map((row) =>
        row.id === activeRow.id
          ? {
              ...row,
              city: formState.city,
              name: formState.name.trim(),
              category: formState.category,
              price: Number(formState.price),
            }
          : row
      )
    );

    setIsEditOpen(false);
    setActiveRow(null);
    resetForm();
  };

  const handleDelete = () => {
    if (!activeRow) {
      return;
    }

    setRows((currentRows) => currentRows.filter((row) => row.id !== activeRow.id));
    setIsDeleteOpen(false);
    setActiveRow(null);
  };

  return (
    <div className="space-y-5 font-raleway">
      <DashboardPageHeader
        title="Hotel"
        description="Maintain hotel inventories with city, category, and pricing details."
        createLabel="Create Hotel"
        onCreate={() => {
          resetForm();
          setIsCreateOpen(true);
        }}
        icon={Hotel}
        count={rows.length}
        iconColorClass="bg-gradient-to-br from-emerald-500 to-teal-600"
      />

      <Card className="overflow-hidden border-emerald-200/70 bg-white/90 shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-emerald-50/80">
              <TableRow>
                <TableHead>City</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="pr-4 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No hotels available.
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-medium">{row.city}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{row.category}</Badge>
                    </TableCell>
                    <TableCell>${row.price}</TableCell>
                    <TableCell className="pr-4">
                      <CrudRowActions
                        onEdit={() => handleOpenEdit(row)}
                        onDelete={() => {
                          setActiveRow(row);
                          setIsDeleteOpen(true);
                        }}
                        editLabel={`Edit ${row.name}`}
                        deleteLabel={`Delete ${row.name}`}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <EntityFormDialog
        open={isCreateOpen}
        onOpenChange={(open) => {
          setIsCreateOpen(open);
          if (!open) {
            resetForm();
          }
        }}
        title="Create Hotel"
        description="Add a hotel record for a selected city."
        submitLabel="Create"
        onSubmit={handleCreate}
      >
        {formError && <p className="text-sm font-medium text-rose-600">{formError}</p>}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label>City</Label>
            <SearchableSelect
              value={formState.city}
              onValueChange={(value) =>
                setFormState((current) => ({ ...current, city: value }))
              }
              options={cityOptions}
              placeholder="Select city"
              searchPlaceholder="Search city"
              emptyText="No city found"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="hotel-create-name">Name</Label>
            <Input
              id="hotel-create-name"
              value={formState.name}
              onChange={(event) =>
                setFormState((current) => ({ ...current, name: event.target.value }))
              }
              placeholder="Hotel name"
            />
          </div>

          <div className="grid gap-2">
            <Label>Category</Label>
            <Select
              value={formState.category}
              onValueChange={(value) =>
                setFormState((current) => ({
                  ...current,
                  category: value as HotelCategory,
                }))
              }
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {hotelCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="hotel-create-price">Price</Label>
            <Input
              id="hotel-create-price"
              type="number"
              min={1}
              value={formState.price}
              onChange={(event) =>
                setFormState((current) => ({ ...current, price: event.target.value }))
              }
              placeholder="Price in USD"
            />
          </div>
        </div>
      </EntityFormDialog>

      <EntityFormDialog
        open={isEditOpen}
        onOpenChange={(open) => {
          setIsEditOpen(open);
          if (!open) {
            setActiveRow(null);
            resetForm();
          }
        }}
        title="Edit Hotel"
        description="Update hotel details."
        submitLabel="Save Changes"
        onSubmit={handleEdit}
      >
        {formError && <p className="text-sm font-medium text-rose-600">{formError}</p>}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label>City</Label>
            <SearchableSelect
              value={formState.city}
              onValueChange={(value) =>
                setFormState((current) => ({ ...current, city: value }))
              }
              options={cityOptions}
              placeholder="Select city"
              searchPlaceholder="Search city"
              emptyText="No city found"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="hotel-edit-name">Name</Label>
            <Input
              id="hotel-edit-name"
              value={formState.name}
              onChange={(event) =>
                setFormState((current) => ({ ...current, name: event.target.value }))
              }
              placeholder="Hotel name"
            />
          </div>

          <div className="grid gap-2">
            <Label>Category</Label>
            <Select
              value={formState.category}
              onValueChange={(value) =>
                setFormState((current) => ({
                  ...current,
                  category: value as HotelCategory,
                }))
              }
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {hotelCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="hotel-edit-price">Price</Label>
            <Input
              id="hotel-edit-price"
              type="number"
              min={1}
              value={formState.price}
              onChange={(event) =>
                setFormState((current) => ({ ...current, price: event.target.value }))
              }
              placeholder="Price in USD"
            />
          </div>
        </div>
      </EntityFormDialog>

      <DeleteConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="Delete hotel"
        description={`This will permanently delete ${activeRow?.name ?? "this hotel"}.`}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default HotelPage;
