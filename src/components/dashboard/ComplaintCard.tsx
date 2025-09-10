import React from "react";
import {
  LocationOn as LocationIcon,
  Person as PersonIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  Image as ImageIcon,
  VideoLibrary as VideoIcon,
  CalendarToday as CalendarIcon,
} from "@mui/icons-material";
import { Card, CardContent, Chip, IconButton, Typography } from "@mui/material";
import { Button } from "@/components/ui/button";
import { Complaint } from "@/data/demoData";

interface ComplaintCardProps {
  complaint: Complaint;
  onViewDetails: (complaint: Complaint) => void;
  onForward: (complaint: Complaint) => void;
  onViewMap: (complaint: Complaint) => void;
}

export function ComplaintCard({
  complaint,
  onViewDetails,
  onForward,
  onViewMap,
}: ComplaintCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "warning";
      case "Forwarded":
        return "info";
      case "Resolved":
        return "success";
      case "Cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const photoCount = complaint.media.photos?.length ?? 0;
  const videoCount = complaint.media.videos?.length ?? 0;
  const hasMedia = photoCount + videoCount > 0;

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        {/* Top row: id, status, date */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-2">
            <Typography variant="subtitle2" className="font-semibold text-primary">
              {complaint.id}
            </Typography>
            <Chip
              label={complaint.status}
              color={getStatusColor(complaint.status) as any}
              size="small"
              variant="filled"
            />
          </div>
          <div className="flex items-center text-muted-foreground text-sm">
            <CalendarIcon fontSize="small" className="mr-1" />
            {formatDate(complaint.date)}
          </div>
        </div>

        {/* User */}
        <div className="flex items-center mb-2">
          <PersonIcon fontSize="small" className="mr-2 text-muted-foreground" />
          <Typography variant="body2" className="text-muted-foreground">
            {complaint.user}
          </Typography>
        </div>

        {/* Description */}
        <Typography variant="body2" className="mb-3 text-foreground line-clamp-2">
          {complaint.description}
        </Typography>

        {/* Location */}
        <div className="flex items-center mb-3">
          <LocationIcon fontSize="small" className="mr-2 text-muted-foreground" />
          <Typography variant="body2" className="text-muted-foreground flex-1">
            {complaint.location.address}
          </Typography>
          <Button variant="outline" size="sm" onClick={() => onViewMap(complaint)} className="ml-2">
            View on Map
          </Button>
        </div>

        {/* Media */}
        {hasMedia && (
          <div className="flex items-center mb-3 space-x-4">
            {photoCount > 0 && (
              <div className="flex items-center">
                <ImageIcon fontSize="small" className="mr-1 text-muted-foreground" />
                <Typography variant="caption" className="text-muted-foreground">
                  {photoCount} photo{photoCount > 1 ? "s" : ""}
                </Typography>
              </div>
            )}
            {videoCount > 0 && (
              <div className="flex items-center">
                <VideoIcon fontSize="small" className="mr-1 text-muted-foreground" />
                <Typography variant="caption" className="text-muted-foreground">
                  {videoCount} video{videoCount > 1 ? "s" : ""}
                </Typography>
              </div>
            )}
          </div>
        )}

        {/* Bottom row: votes + actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <IconButton size="small" className="text-success">
                <ThumbUpIcon fontSize="small" />
              </IconButton>
              <Typography variant="caption" className="text-muted-foreground">
                {complaint.upvotes}
              </Typography>
            </div>

            <div className="flex items-center">
              <IconButton size="small" className="text-destructive">
                <ThumbDownIcon fontSize="small" />
              </IconButton>
              <Typography variant="caption" className="text-muted-foreground">
                {complaint.downvotes}
              </Typography>
            </div>
            {/* department chip intentionally removed */}
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => onViewDetails(complaint)}>
              View Details
            </Button>
            {complaint.status === "Pending" && (
              <Button variant="default" size="sm" onClick={() => onForward(complaint)}>
                Forward
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
