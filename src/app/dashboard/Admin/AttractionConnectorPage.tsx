import { useMemo, useState } from "react";
import { Link2 } from "lucide-react";

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
  mockAttractionConnectors,
  mockAttractions,
  mockHotels,
  travelModes,
} from "./_data/mockData";
import type { AttractionConnector, TravelMode } from "./_types/entities";
import DashboardPageHeader from "./_components/DashboardPageHeader";
import CrudRowActions from "./_components/CrudRowActions";
import DeleteConfirmDialog from "./_components/DeleteConfirmDialog";
import EntityFormDialog from "./_components/EntityFormDialog";
import SearchableSelect from "./_components/SearchableSelect";
import { createId } from "./_utils/createId";

type AttractionConnectorFormState = {
  hotel: string;
  attraction: string;
  mode: TravelMode;
  time: string;
};

const initialForm: AttractionConnectorFormState = {
  hotel: "",
  attraction: "",
  mode: travelModes[0],
  time: "",
};

const modeBadgeMap: Record<TravelMode, "default" | "secondary" | "outline" | "success" | "warning"> = {
  Car: "secondary",
  Bus: "default",
  Bike: "success",
  Walk: "warning",
  Boat: "outline",
};

const AttractionConnectorPage = () => {
  const [rows, setRows] = useState<AttractionConnector[]>(mockAttractionConnectors);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [activeRow, setActiveRow] = useState<AttractionConnector | null>(null);
  const [formState, setFormState] = useState<AttractionConnectorFormState>(initialForm);
  const [formError, setFormError] = useState("");

  const hotelOptions = useMemo(
    () => mockHotels.map((hotel) => ({ value: hotel.name, label: hotel.name })),
    []
  );

  const attractionOptions = useMemo(
    () =>
      mockAttractions.map((attraction) => ({
        value: attraction.name,
        label: attraction.name,
      })),
    []
  );

  const resetForm = () => {
    setFormState(initialForm);
    setFormError("");
  };

  const validate = () => {
    if (!formState.hotel || !formState.attraction || !formState.mode || !formState.time) {
      setFormError("All fields are required.");
      return false;
    }

    const numericTime = Number(formState.time);
    if (!Number.isFinite(numericTime) || numericTime <= 0) {
      setFormError("Time must be greater than 0.");
      return false;
    }

    setFormError("");
    return true;
  };

  const handleCreate = () => {
    if (!validate()) {
      return;
    }

    const newConnector: AttractionConnector = {
      id: createId("attraction-connector"),
      hotel: formState.hotel,
      attraction: formState.attraction,
      mode: formState.mode,
      time: Number(formState.time),
    };

    setRows((currentRows) => [newConnector, ...currentRows]);
    setIsCreateOpen(false);
    resetForm();
  };

  const handleOpenEdit = (row: AttractionConnector) => {
    setActiveRow(row);
    setFormState({
      hotel: row.hotel,
      attraction: row.attraction,
      mode: row.mode,
      time: String(row.time),
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
              hotel: formState.hotel,
              attraction: formState.attraction,
              mode: formState.mode,
              time: Number(formState.time),
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
        title="Attraction Connector"
        description="Connect hotels with nearby attractions including travel mode and ETA."
        createLabel="Create Connector"
        onCreate={() => {
          resetForm();
          setIsCreateOpen(true);
        }}
        icon={Link2}
        count={rows.length}
        iconColorClass="bg-gradient-to-br from-amber-500 to-orange-600"
      />

      <Card className="overflow-hidden border-amber-200/70 bg-white/90 shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-amber-50/80">
              <TableRow>
                <TableHead>Hotel</TableHead>
                <TableHead>Attraction</TableHead>
                <TableHead>Mode</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="pr-4 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No attraction connectors available.
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-medium">{row.hotel}</TableCell>
                    <TableCell>{row.attraction}</TableCell>
                    <TableCell>
                      <Badge variant={modeBadgeMap[row.mode]}>{row.mode}</Badge>
                    </TableCell>
                    <TableCell>{row.time} min</TableCell>
                    <TableCell className="pr-4">
                      <CrudRowActions
                        onEdit={() => handleOpenEdit(row)}
                        onDelete={() => {
                          setActiveRow(row);
                          setIsDeleteOpen(true);
                        }}
                        editLabel={`Edit connector ${row.hotel} to ${row.attraction}`}
                        deleteLabel={`Delete connector ${row.hotel} to ${row.attraction}`}
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
        title="Create Attraction Connector"
        description="Add a hotel-to-attraction connection route."
        submitLabel="Create"
        onSubmit={handleCreate}
      >
        {formError && <p className="text-sm font-medium text-rose-600">{formError}</p>}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label>Hotel</Label>
            <SearchableSelect
              value={formState.hotel}
              onValueChange={(value) =>
                setFormState((current) => ({ ...current, hotel: value }))
              }
              options={hotelOptions}
              placeholder="Select hotel"
              searchPlaceholder="Search hotel"
              emptyText="No hotel found"
            />
          </div>

          <div className="grid gap-2">
            <Label>Attraction</Label>
            <SearchableSelect
              value={formState.attraction}
              onValueChange={(value) =>
                setFormState((current) => ({ ...current, attraction: value }))
              }
              options={attractionOptions}
              placeholder="Select attraction"
              searchPlaceholder="Search attraction"
              emptyText="No attraction found"
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
            <Label htmlFor="attraction-connector-time">Time</Label>
            <Input
              id="attraction-connector-time"
              type="number"
              min={1}
              value={formState.time}
              onChange={(event) =>
                setFormState((current) => ({ ...current, time: event.target.value }))
              }
              placeholder="Time in minutes"
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
        title="Edit Attraction Connector"
        description="Update connector details."
        submitLabel="Save Changes"
        onSubmit={handleEdit}
      >
        {formError && <p className="text-sm font-medium text-rose-600">{formError}</p>}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label>Hotel</Label>
            <SearchableSelect
              value={formState.hotel}
              onValueChange={(value) =>
                setFormState((current) => ({ ...current, hotel: value }))
              }
              options={hotelOptions}
              placeholder="Select hotel"
              searchPlaceholder="Search hotel"
              emptyText="No hotel found"
            />
          </div>

          <div className="grid gap-2">
            <Label>Attraction</Label>
            <SearchableSelect
              value={formState.attraction}
              onValueChange={(value) =>
                setFormState((current) => ({ ...current, attraction: value }))
              }
              options={attractionOptions}
              placeholder="Select attraction"
              searchPlaceholder="Search attraction"
              emptyText="No attraction found"
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
            <Label htmlFor="attraction-connector-time-edit">Time</Label>
            <Input
              id="attraction-connector-time-edit"
              type="number"
              min={1}
              value={formState.time}
              onChange={(event) =>
                setFormState((current) => ({ ...current, time: event.target.value }))
              }
              placeholder="Time in minutes"
            />
          </div>
        </div>
      </EntityFormDialog>

      <DeleteConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="Delete attraction connector"
        description={`This will remove connector ${activeRow?.hotel ?? ""} to ${activeRow?.attraction ?? ""}.`}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AttractionConnectorPage;
