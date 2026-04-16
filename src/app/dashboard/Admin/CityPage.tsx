import { useState } from "react";
import { Building2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { mockCities } from "./_data/mockData";
import type { City } from "./_types/entities";
import DashboardPageHeader from "./_components/DashboardPageHeader";
import CrudRowActions from "./_components/CrudRowActions";
import DeleteConfirmDialog from "./_components/DeleteConfirmDialog";
import EntityFormDialog from "./_components/EntityFormDialog";
import { createId } from "./_utils/createId";

type CityFormState = {
  name: string;
  descp: string;
};

const initialForm: CityFormState = {
  name: "",
  descp: "",
};

const CityPage = () => {
  const [rows, setRows] = useState<City[]>(mockCities);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [activeRow, setActiveRow] = useState<City | null>(null);
  const [formState, setFormState] = useState<CityFormState>(initialForm);
  const [formError, setFormError] = useState("");

  const resetForm = () => {
    setFormState(initialForm);
    setFormError("");
  };

  const validateForm = () => {
    if (!formState.name.trim() || !formState.descp.trim()) {
      setFormError("Both fields are required.");
      return false;
    }

    setFormError("");
    return true;
  };

  const handleCreate = () => {
    if (!validateForm()) {
      return;
    }

    const newCity: City = {
      id: createId("city"),
      name: formState.name.trim(),
      descp: formState.descp.trim(),
    };

    setRows((currentRows) => [newCity, ...currentRows]);
    setIsCreateOpen(false);
    resetForm();
  };

  const handleOpenEdit = (row: City) => {
    setActiveRow(row);
    setFormState({
      name: row.name,
      descp: row.descp,
    });
    setFormError("");
    setIsEditOpen(true);
  };

  const handleEdit = () => {
    if (!activeRow || !validateForm()) {
      return;
    }

    setRows((currentRows) =>
      currentRows.map((row) =>
        row.id === activeRow.id
          ? {
              ...row,
              name: formState.name.trim(),
              descp: formState.descp.trim(),
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
        title="City"
        description="Manage core city nodes used across hotels, attractions, and route planning."
        createLabel="Create City"
        onCreate={() => {
          resetForm();
          setIsCreateOpen(true);
        }}
        icon={Building2}
        count={rows.length}
        iconColorClass="bg-gradient-to-br from-cyan-500 to-blue-600"
      />

      <Card className="overflow-hidden border-sky-200/70 bg-white/90 shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-sky-50/80">
              <TableRow>
                <TableHead className="w-[220px]">Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="pr-4 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center">
                    No city records found.
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-medium">{row.name}</TableCell>
                    <TableCell className="max-w-[560px] text-muted-foreground">
                      {row.descp}
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
        title="Create City"
        description="Add a new city with a short description."
        submitLabel="Create"
        onSubmit={handleCreate}
      >
        {formError && <p className="text-sm font-medium text-rose-600">{formError}</p>}

        <div className="grid gap-2">
          <Label htmlFor="city-create-name">Name</Label>
          <Input
            id="city-create-name"
            value={formState.name}
            onChange={(event) =>
              setFormState((current) => ({ ...current, name: event.target.value }))
            }
            placeholder="Enter city name"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="city-create-descp">Description</Label>
          <Textarea
            id="city-create-descp"
            className="min-h-[120px]"
            value={formState.descp}
            onChange={(event) =>
              setFormState((current) => ({ ...current, descp: event.target.value }))
            }
            placeholder="Enter city description"
          />
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
        title="Edit City"
        description="Update city details."
        submitLabel="Save Changes"
        onSubmit={handleEdit}
      >
        {formError && <p className="text-sm font-medium text-rose-600">{formError}</p>}

        <div className="grid gap-2">
          <Label htmlFor="city-edit-name">Name</Label>
          <Input
            id="city-edit-name"
            value={formState.name}
            onChange={(event) =>
              setFormState((current) => ({ ...current, name: event.target.value }))
            }
            placeholder="Enter city name"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="city-edit-descp">Description</Label>
          <Textarea
            id="city-edit-descp"
            className="min-h-[120px]"
            value={formState.descp}
            onChange={(event) =>
              setFormState((current) => ({ ...current, descp: event.target.value }))
            }
            placeholder="Enter city description"
          />
        </div>
      </EntityFormDialog>

      <DeleteConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="Delete city"
        description={`This will permanently delete ${activeRow?.name ?? "this city"}.`}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default CityPage;
