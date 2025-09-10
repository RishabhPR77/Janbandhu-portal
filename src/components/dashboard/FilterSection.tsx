import { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem, TextField, Chip } from "@mui/material";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { indianStates } from "@/data/demoData";

export interface FilterState {
  state: string;
  city: string;
  age: string;
  upvotes: string;
  dateFrom: string;
  dateTo: string;
}

interface FilterSectionProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

export function FilterSection({ filters, onFiltersChange, onApplyFilters, onClearFilters }: FilterSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const selectedState = indianStates.find((state) => state.name === filters.state);
  const availableCities = selectedState ? selectedState.cities : [];

  const handleFilterChange = (field: keyof FilterState, value: string) => {
    const next = { ...filters, [field]: value };
    if (field === "state") next.city = "";
    onFiltersChange(next);
  };

  const getActiveFiltersCount = () => Object.values(filters).filter((v) => v !== "").length;

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-semibold">Filters</h3>
            {getActiveFiltersCount() > 0 && (
              <Chip label={`${getActiveFiltersCount()} active`} size="small" color="primary" variant="filled" />
            )}
          </div>
          <Button variant="ghost" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>

        {isExpanded && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <FormControl fullWidth size="small">
                <InputLabel>State</InputLabel>
                <Select value={filters.state} label="State" onChange={(e) => handleFilterChange("state", e.target.value)}>
                  <MenuItem value="">All States</MenuItem>
                  {indianStates.map((state) => (
                    <MenuItem key={state.name} value={state.name}>
                      {state.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth size="small">
                <InputLabel>City</InputLabel>
                <Select
                  value={filters.city}
                  label="City"
                  onChange={(e) => handleFilterChange("city", e.target.value)}
                  disabled={!filters.state}
                >
                  <MenuItem value="">All Cities</MenuItem>
                  {availableCities.map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth size="small">
                <InputLabel>Complaint Age</InputLabel>
                <Select value={filters.age} label="Complaint Age" onChange={(e) => handleFilterChange("age", e.target.value)}>
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="New">New</MenuItem>
                  <MenuItem value="Old">Old</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth size="small">
                <InputLabel>Upvotes</InputLabel>
                <Select value={filters.upvotes} label="Upvotes" onChange={(e) => handleFilterChange("upvotes", e.target.value)}>
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="High">High (50+)</MenuItem>
                  <MenuItem value="Low">Low (&lt;50)</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                size="small"
                label="Date From"
                type="date"
                value={filters.dateFrom}
                onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                fullWidth
                size="small"
                label="Date To"
                type="date"
                value={filters.dateTo}
                onChange={(e) => handleFilterChange("dateTo", e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </div>

            <div className="flex space-x-3">
              <Button onClick={onApplyFilters}>Apply Filters</Button>
              <Button variant="outline" onClick={onClearFilters}>
                Clear All
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
