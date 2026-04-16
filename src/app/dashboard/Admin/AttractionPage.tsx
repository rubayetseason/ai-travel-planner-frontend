import { useMemo, useState } from "react";
import { MapPinned } from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";

import {
  attractionCategories,
  mockAttractions,
  mockCities,
} from "./_data/mockData";
import type { Attraction, AttractionCategory } from "./_types/entities";
import DashboardPageHeader from "./_components/DashboardPageHeader";
import CrudRowActions from "./_components/CrudRowActions";
import DeleteConfirmDialog from "./_components/DeleteConfirmDialog";
import EntityFormDialog from "./_components/EntityFormDialog";
import SearchableSelect from "./_components/SearchableSelect";
import { createId } from "./_utils/createId";

type AttractionFormState = {
  city: string;
  name: string;
  descp: string;
  lat: string;
  long: string;
  category: AttractionCategory;
  rating: string;
  openingHours: string;
  entryFee: string;
  duration: string;
  imageUrl: string;
};

const initialForm: AttractionFormState = {
  city: "",
  name: "",
  descp: "",
  lat: "",
  long: "",
  category: attractionCategories[0],
  rating: "",
  openingHours: "",
  entryFee: "",
  duration: "",
  imageUrl: "",
};

const AttractionPage = () => {
  const [rows, setRows] = useState<Attraction[]>(mockAttractions);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [activeRow, setActiveRow] = useState<Attraction | null>(null);
  const [formState, setFormState] = useState<AttractionFormState>(initialForm);
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
    const requiredValues = [
      formState.city,
      formState.name.trim(),
      formState.descp.trim(),
      formState.lat,
      formState.long,
      formState.category,
      formState.rating,
      formState.openingHours.trim(),
      formState.entryFee,
      formState.duration.trim(),
      formState.imageUrl.trim(),
    ];

    if (requiredValues.some((value) => !value)) {
      setFormError("All fields are required.");
      return false;
    }

    const lat = Number(formState.lat);
    const long = Number(formState.long);
    const rating = Number(formState.rating);
    const entryFee = Number(formState.entryFee);

    if (!Number.isFinite(lat) || lat < -90 || lat > 90) {
      setFormError("Latitude must be between -90 and 90.");
      return false;
    }

    if (!Number.isFinite(long) || long < -180 || long > 180) {
      setFormError("Longitude must be between -180 and 180.");
      return false;
    }

    if (!Number.isFinite(rating) || rating < 0 || rating > 5) {
      setFormError("Rating must be between 0 and 5.");
      return false;
    }

    if (!Number.isFinite(entryFee) || entryFee < 0) {
      setFormError("Entry fee cannot be negative.");
      return false;
    }

    setFormError("");
    return true;
  };

  const buildAttraction = (id: string): Attraction => ({
    id,
    city: formState.city,
    name: formState.name.trim(),
    descp: formState.descp.trim(),
    lat: Number(formState.lat),
    long: Number(formState.long),
    category: formState.category,
    rating: Number(formState.rating),
    openingHours: formState.openingHours.trim(),
    entryFee: Number(formState.entryFee),
    duration: formState.duration.trim(),
    imageUrl: formState.imageUrl.trim(),
  });

  const handleCreate = () => {
    if (!validate()) {
      return;
    }

    const newRow = buildAttraction(createId("attraction"));
    setRows((currentRows) => [newRow, ...currentRows]);
    setIsCreateOpen(false);
    resetForm();
  };

  const handleOpenEdit = (row: Attraction) => {
    setActiveRow(row);
    setFormState({
      city: row.city,
      name: row.name,
      descp: row.descp,
      lat: String(row.lat),
      long: String(row.long),
      category: row.category,
      rating: String(row.rating),
      openingHours: row.openingHours,
      entryFee: String(row.entryFee),
      duration: row.duration,
      imageUrl: row.imageUrl,
    });
    setFormError("");
    setIsEditOpen(true);
  };

  const handleEdit = () => {
    if (!activeRow || !validate()) {
      return;
    }

    const updatedRow = buildAttraction(activeRow.id);
    setRows((currentRows) =>
      currentRows.map((row) => (row.id === activeRow.id ? updatedRow : row))
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
        title="Attraction"
        description="Manage detailed attraction records with location, pricing, and visit metadata."
        createLabel="Create Attraction"
        onCreate={() => {
          resetForm();
          setIsCreateOpen(true);
        }}
        icon={MapPinned}
        count={rows.length}
        iconColorClass="bg-gradient-to-br from-fuchsia-500 to-rose-600"
      />

      <Card className="overflow-hidden border-fuchsia-200/70 bg-white/90 shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-fuchsia-50/80">
              <TableRow>
                <TableHead>City</TableHead>
                <TableHead>Name & Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Coordinates</TableHead>
                <TableHead>Entry Fee</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Image</TableHead>
                <TableHead className="pr-4 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center">
                    No attractions available.
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-medium">{row.city}</TableCell>
                    <TableCell className="max-w-[320px]">
                      <p className="font-medium">{row.name}</p>
                      <p className="text-muted-foreground mt-0.5 line-clamp-2 text-xs">
                        {row.descp}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{row.category}</Badge>
                    </TableCell>
                    <TableCell>{row.rating.toFixed(1)}</TableCell>
                    <TableCell>
                      {row.lat.toFixed(4)}, {row.long.toFixed(4)}
                    </TableCell>
                    <TableCell>${row.entryFee}</TableCell>
                    <TableCell>{row.duration}</TableCell>
                    <TableCell>
                      <a
                        href={row.imageUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sky-700 underline-offset-2 hover:underline"
                      >
                        Preview
                      </a>
                    </TableCell>
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
        title="Create Attraction"
        description="Add a new attraction with complete metadata."
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
            <Label htmlFor="attraction-create-name">Name</Label>
            <Input
              id="attraction-create-name"
              value={formState.name}
              onChange={(event) =>
                setFormState((current) => ({ ...current, name: event.target.value }))
              }
              placeholder="Attraction name"
            />
          </div>

          <div className="grid gap-2 md:col-span-2">
            <Label htmlFor="attraction-create-descp">Description</Label>
            <Textarea
              id="attraction-create-descp"
              className="min-h-[100px]"
              value={formState.descp}
              onChange={(event) =>
                setFormState((current) => ({ ...current, descp: event.target.value }))
              }
              placeholder="Short attraction description"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="attraction-create-lat">Latitude</Label>
            <Input
              id="attraction-create-lat"
              type="number"
              step="0.0001"
              value={formState.lat}
              onChange={(event) =>
                setFormState((current) => ({ ...current, lat: event.target.value }))
              }
              placeholder="e.g. 23.8103"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="attraction-create-long">Longitude</Label>
            <Input
              id="attraction-create-long"
              type="number"
              step="0.0001"
              value={formState.long}
              onChange={(event) =>
                setFormState((current) => ({ ...current, long: event.target.value }))
              }
              placeholder="e.g. 90.4125"
            />
          </div>

          <div className="grid gap-2">
            <Label>Category</Label>
            <Select
              value={formState.category}
              onValueChange={(value) =>
                setFormState((current) => ({
                  ...current,
                  category: value as AttractionCategory,
                }))
              }
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {attractionCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="attraction-create-rating">Rating</Label>
            <Input
              id="attraction-create-rating"
              type="number"
              min={0}
              max={5}
              step="0.1"
              value={formState.rating}
              onChange={(event) =>
                setFormState((current) => ({ ...current, rating: event.target.value }))
              }
              placeholder="0 - 5"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="attraction-create-opening-hours">Opening Hours</Label>
            <Input
              id="attraction-create-opening-hours"
              value={formState.openingHours}
              onChange={(event) =>
                setFormState((current) => ({
                  ...current,
                  openingHours: event.target.value,
                }))
              }
              placeholder="e.g. 09:00 - 18:00"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="attraction-create-entry-fee">Entry Fee</Label>
            <Input
              id="attraction-create-entry-fee"
              type="number"
              min={0}
              value={formState.entryFee}
              onChange={(event) =>
                setFormState((current) => ({ ...current, entryFee: event.target.value }))
              }
              placeholder="Entry fee in USD"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="attraction-create-duration">Duration</Label>
            <Input
              id="attraction-create-duration"
              value={formState.duration}
              onChange={(event) =>
                setFormState((current) => ({ ...current, duration: event.target.value }))
              }
              placeholder="e.g. 2-3 hours"
            />
          </div>

          <div className="grid gap-2 md:col-span-2">
            <Label htmlFor="attraction-create-image-url">Image URL</Label>
            <Input
              id="attraction-create-image-url"
              value={formState.imageUrl}
              onChange={(event) =>
                setFormState((current) => ({ ...current, imageUrl: event.target.value }))
              }
              placeholder="https://..."
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
        title="Edit Attraction"
        description="Update attraction details."
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
            <Label htmlFor="attraction-edit-name">Name</Label>
            <Input
              id="attraction-edit-name"
              value={formState.name}
              onChange={(event) =>
                setFormState((current) => ({ ...current, name: event.target.value }))
              }
              placeholder="Attraction name"
            />
          </div>

          <div className="grid gap-2 md:col-span-2">
            <Label htmlFor="attraction-edit-descp">Description</Label>
            <Textarea
              id="attraction-edit-descp"
              className="min-h-[100px]"
              value={formState.descp}
              onChange={(event) =>
                setFormState((current) => ({ ...current, descp: event.target.value }))
              }
              placeholder="Short attraction description"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="attraction-edit-lat">Latitude</Label>
            <Input
              id="attraction-edit-lat"
              type="number"
              step="0.0001"
              value={formState.lat}
              onChange={(event) =>
                setFormState((current) => ({ ...current, lat: event.target.value }))
              }
              placeholder="e.g. 23.8103"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="attraction-edit-long">Longitude</Label>
            <Input
              id="attraction-edit-long"
              type="number"
              step="0.0001"
              value={formState.long}
              onChange={(event) =>
                setFormState((current) => ({ ...current, long: event.target.value }))
              }
              placeholder="e.g. 90.4125"
            />
          </div>

          <div className="grid gap-2">
            <Label>Category</Label>
            <Select
              value={formState.category}
              onValueChange={(value) =>
                setFormState((current) => ({
                  ...current,
                  category: value as AttractionCategory,
                }))
              }
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {attractionCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="attraction-edit-rating">Rating</Label>
            <Input
              id="attraction-edit-rating"
              type="number"
              min={0}
              max={5}
              step="0.1"
              value={formState.rating}
              onChange={(event) =>
                setFormState((current) => ({ ...current, rating: event.target.value }))
              }
              placeholder="0 - 5"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="attraction-edit-opening-hours">Opening Hours</Label>
            <Input
              id="attraction-edit-opening-hours"
              value={formState.openingHours}
              onChange={(event) =>
                setFormState((current) => ({
                  ...current,
                  openingHours: event.target.value,
                }))
              }
              placeholder="e.g. 09:00 - 18:00"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="attraction-edit-entry-fee">Entry Fee</Label>
            <Input
              id="attraction-edit-entry-fee"
              type="number"
              min={0}
              value={formState.entryFee}
              onChange={(event) =>
                setFormState((current) => ({ ...current, entryFee: event.target.value }))
              }
              placeholder="Entry fee in USD"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="attraction-edit-duration">Duration</Label>
            <Input
              id="attraction-edit-duration"
              value={formState.duration}
              onChange={(event) =>
                setFormState((current) => ({ ...current, duration: event.target.value }))
              }
              placeholder="e.g. 2-3 hours"
            />
          </div>

          <div className="grid gap-2 md:col-span-2">
            <Label htmlFor="attraction-edit-image-url">Image URL</Label>
            <Input
              id="attraction-edit-image-url"
              value={formState.imageUrl}
              onChange={(event) =>
                setFormState((current) => ({ ...current, imageUrl: event.target.value }))
              }
              placeholder="https://..."
            />
          </div>
        </div>
      </EntityFormDialog>

      <DeleteConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="Delete attraction"
        description={`This will permanently delete ${activeRow?.name ?? "this attraction"}.`}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AttractionPage;
