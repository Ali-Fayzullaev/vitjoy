"use client";

import { Grid3X3, List } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

interface ViewControlsProps {
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
  itemsPerRow: number;
  onItemsPerRowChange: (count: number) => void;
}

export function ViewControls({
  view,
  onViewChange,
  itemsPerRow,
  onItemsPerRowChange,
}: ViewControlsProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1">
        <Button
          variant={view === "grid" ? "default" : "outline"}
          size="icon"
          onClick={() => onViewChange("grid")}
          className="h-9 w-9"
        >
          <Grid3X3 className="h-4 w-4" />
        </Button>
        <Button
          variant={view === "list" ? "default" : "outline"}
          size="icon"
          onClick={() => onViewChange("list")}
          className="h-9 w-9"
        >
          <List className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">На строку:</span>
        <div className="flex gap-1">
          {[2, 3, 4].map((count) => (
            <Button
              key={count}
              variant={itemsPerRow === count ? "default" : "outline"}
              size="sm"
              onClick={() => onItemsPerRowChange(count)}
              className="h-8 w-8 p-0 text-xs"
            >
              {count}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
