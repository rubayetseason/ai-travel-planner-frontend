import { useMemo, useState } from "react";
import { Route } from "lucide-react";

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

import {
  mockCities,
  mockTravelConnectors,
  travelModes,
} from "./_data/mockData";
import type { TravelConnector, TravelMode } from "./_types/entities";
import DashboardPageHeader from "./_components/DashboardPageHeader";
import CrudRowActions from "./_components/CrudRowActions";
import DeleteConfirmDialog from "./_components/DeleteConfirmDialog";
import EntityFormDialog from "./_components/EntityFormDialog";
import SearchableSelect from "./_components/SearchableSelect";
import { createId } from "./_utils/createId";

type TravelConnectorFormState = {
  city1: string;
  city2: string;
  mode: TravelMode;
  timeInMinutes: string;
};

const initialForm: TravelConnectorFormState = {
  city1: "",
  city2: "",
  mode: travelModes[0],
  timeInMinutes: "",
};

const modeBadgeMap: Record<TravelMode, "default" | "secondary" | "outline" | "success" | "warning"> = {
  Car: "secondary",
  Bus: "default",
  Bike: "success",
  Walk: "warning",
  Boat: "outline",
};

const TravelConnectorPage = () => {
  const [rows, setRows] = useState<TravelConnector[]>(mockTravelConnectors);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [activeRow, setActiveRow] = useState<TravelConnector | null>(null);
  const [formState, setFormState] = useState<TravelConnectorFormState>(initialForm);
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
    if (!formState.city1 || !formState.city2 || !formState.mode || !formState.timeInMinutes) {
      setFormError("All fields are required.");
      return false;
    }

    if (formState.city1 === formState.city2) {
      setFormError("City 1 and City 2 must be different.");
      return false;
    }

    const minutes = Number(formState.timeInMinutes);
    if (!Number.isFinite(minutes) || minutes <= 0) {
      setFormError("Time in minutes must be greater than 0.");
      return false;
    }

    setFormError("");
    return true;
  };

  const handleCreate = () => {
    if (!validate()) {
      return;
    }

    const newConnector: TravelConnector = {
      id: createId("travel-connector"),
      city1: formState.city1,
      city2: formState.city2,
      mode: formState.mode,
      timeInMinutes: Number(formState.timeInMinutes),
    };

    setRows((currentRows) => [newConnector, ...currentRows]);
    setIsCreateOpen(false);
    resetForm();
  };

  const handleOpenEdit = (row: TravelConnector) => {
    setActiveRow(row);
    setFormState({
      city1: row.city1,
      city2: row.city2,
      mode: row.mode,
      timeInMinutes: String(row.timeInMinutes),
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
              city1: formState.city1,
              city2: formState.city2,
              mode: formState.mode,
              timeInMinutes: Number(formState.timeInMinutes),
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
        title="Travel Connector"
        description="Define estimated connection time and transport mode between two cities."
        createLabel="Create Connector"
        onCreate={() => {
          resetForm();
          setIsCreateOpen(true);
        }}
        icon={Route}
        count={rows.length}
        iconColorClass="bg-gradient-to-br from-indigo-500 to-violet-600"
      />

      <Card className="overflow-hidden border-indigo-200/70 bg-white/90 shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-indigo-50/80">
              <TableRow>
                <TableHead>City 1</TableHead>
                <TableHead>City 2</TableHead>
                <TableHead>Mode</TableHead>
                <TableHead>Time (min)</TableHead>
                <TableHead className="pr-4 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No travel connectors available.
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-medium">{row.city1}</TableCell>
                    <TableCell className="font-medium">{row.city2}</TableCell>
                    <TableCell>
                      <Badge variant={modeBadgeMap[row.mode]}>{row.mode}</Badge>
                    </TableCell>
                    <TableCell>{row.timeInMinutes}</TableCell>
                    <TableCell className="pr-4">
                      <CrudRowActions
                        onEdit={() => handleOpenEdit(row)}
                        onDelete={() => {
                          setActiveRow(row);
                          setIsDeleteOpen(true);
                        }}
                        editLabel={`Edit connector ${row.city1} to ${row.city2}`}
                        deleteLabel={`Delete connector ${row.city1} to ${row.city2}`}
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
        title="Create Travel Connector"
        description="Add a city-to-city travel connection."
        submitLabel="Create"
        onSubmit={handleCreate}
      >
        {formError && <p className="text-sm font-medium text-rose-600">{formError}</p>}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label>City 1</Label>
            <SearchableSelect
              value={formState.city1}
              onValueChange={(value) =>
                setFormState((current) => ({ ...current, city1: value }))
              }
              options={cityOptions}
              placeholder="Select city 1"
              searchPlaceholder="Search city"
              emptyText="No city found"
            />
          </div>

          <div className="grid gap-2">
            <Label>City 2</Label>
            <SearchableSelect
              value={formState.city2}
              onValueChange={(value) =>
                setFormState((current) => ({ ...current, city2: value }))
              }
              options={cityOptions}
              placeholder="Select city 2"
              searchPlaceholder="Search city"
              emptyText="No city found"
            />
          </div>

          <div className="grid gap-2">
            <Label>Mode</Label>
            <Select
              value={formState.mode}
              onValueChange={(value) =>
                setFormState((current) => ({ ...current, mode: value as TravelMode }))
              }
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select mode" />
              </SelectTrigger>
              <SelectContent>
                {travelModes.map((mode) => (
                  <SelectItem key={mode} value={mode}>
                    {mode}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="travel-connector-time">Time in minutes</Label>
            <Input
              id="travel-connector-time"
              type="number"
              min={1}
              value={formState.timeInMinutes}
              onChange={(event) =>
                setFormState((current) => ({ ...current, timeInMinutes: event.target.value }))
              }
              placeholder="e.g. 60"
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
        title="Edit Travel Connector"
        description="Update city connection details."
        submitLabel="Save Changes"
        onSubmit={handleEdit}
      >
        {formError && <p className="text-sm font-medium text-rose-600">{formError}</p>}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label>City 1</Label>
            <SearchableSelect
              value={formState.city1}
              onValueChange={(value) =>
                setFormState((current) => ({ ...current, city1: value }))
              }
              options={cityOptions}
              placeholder="Select city 1"
              searchPlaceholder="Search city"
              emptyText="No city found"
            />
          </div>

          <div className="grid gap-2">
            <Label>City 2</Label>
            <SearchableSelect
              value={formState.city2}
              onValueChange={(value) =>
                setFormState((current) => ({ ...current, city2: value }))
              }
              options={cityOptions}
              placeholder="Select city 2"
              searchPlaceholder="Search city"
              emptyText="No city found"
            />
          </div>

          <div className="grid gap-2">
            <Label>Mode</Label>
            <Select
              value={formState.mode}
              onValueChange={(value) =>
                setFormState((current) => ({ ...current, mode: value as TravelMode }))
              }
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select mode" />
              </SelectTrigger>
              <SelectContent>
                {travelModes.map((mode) => (
                  <SelectItem key={mode} value={mode}>
                    {mode}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="travel-connector-time-edit">Time in minutes</Label>
            <Input
              id="travel-connector-time-edit"
              type="number"
              min={1}
              value={formState.timeInMinutes}
              onChange={(event) =>
                setFormState((current) => ({ ...current, timeInMinutes: event.target.value }))
              }
              placeholder="e.g. 60"
            />
          </div>
        </div>
      </EntityFormDialog>

      <DeleteConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="Delete travel connector"
        description={`This will remove connector ${activeRow?.city1 ?? ""} to ${activeRow?.city2 ?? ""}.`}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default TravelConnectorPage;
