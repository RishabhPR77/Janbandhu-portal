import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Phone, Mail, MapPin, Clock } from "lucide-react";
import { Complaint } from "@/data/demoData";

interface Worker {
  id: string;
  name: string;
  department: string; // kept in data, but no UI for choosing department
  designation: string;
  phone: string;
  email: string;
  location: string;
  experience: string;
  currentWorkload: number;
  rating: number;
}

const workers: Worker[] = [
  { id: "W001", name: "Rajesh Sharma", department: "Sanitation", designation: "Senior Sanitation Inspector", phone: "+91 98765 43210", email: "rajesh.sharma@gov.in", location: "Zone A, Mumbai", experience: "8 years", currentWorkload: 3, rating: 4.5 },
  { id: "W002", name: "Priya Patel", department: "Sanitation", designation: "Sanitation Officer", phone: "+91 87654 32109", email: "priya.patel@gov.in", location: "Zone B, Mumbai", experience: "5 years", currentWorkload: 2, rating: 4.7 },
  { id: "W003", name: "Amit Kumar", department: "Electrical", designation: "Electrical Engineer", phone: "+91 76543 21098", email: "amit.kumar@gov.in", location: "Central Delhi", experience: "6 years", currentWorkload: 1, rating: 4.3 },
  { id: "W004", name: "Sunita Singh", department: "Roads", designation: "Road Maintenance Supervisor", phone: "+91 65432 10987", email: "sunita.singh@gov.in", location: "Sector 5, Pune", experience: "10 years", currentWorkload: 4, rating: 4.8 },
  { id: "W005", name: "Vikram Gupta", department: "Water Supply", designation: "Water Supply Engineer", phone: "+91 54321 09876", email: "vikram.gupta@gov.in", location: "Zone C, Chennai", experience: "7 years", currentWorkload: 2, rating: 4.4 },
];

interface ForwardModalProps {
  complaint: Complaint | null;
  isOpen: boolean;
  onClose: () => void;
  // department removed from the callback signature
  onForward: (complaintId: string, workerId: string, days: number) => void;
}

export function ForwardModal({ complaint, isOpen, onClose, onForward }: ForwardModalProps) {
  const [selectedWorker, setSelectedWorker] = useState("");
  const [resolutionDays, setResolutionDays] = useState("");

  const selectedWorkerData = workers.find((w) => w.id === selectedWorker);

  const handleSubmit = () => {
    if (complaint && selectedWorker && resolutionDays) {
      onForward(complaint.id, selectedWorker, parseInt(resolutionDays, 10));
      handleClose();
    }
  };

  const handleClose = () => {
    setSelectedWorker("");
    setResolutionDays("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl bg-white z-50">
        <DialogHeader>
          <DialogTitle>Forward Complaint</DialogTitle>
        </DialogHeader>

        {complaint && (
          <div className="space-y-6">
            {/* Complaint Info */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Complaint Details</h3>
                <p className="text-sm text-muted-foreground mb-1">
                  <strong>ID:</strong> {complaint.id}
                </p>
                <p className="text-sm text-muted-foreground mb-1">
                  <strong>Description:</strong> {complaint.description}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Location:</strong> {complaint.location.address}
                </p>
              </CardContent>
            </Card>

            {/* Worker Selection (no department filter) */}
            <div className="space-y-2">
              <Label htmlFor="worker">Assign to Worker</Label>
              <Select value={selectedWorker} onValueChange={setSelectedWorker}>
                <SelectTrigger className="bg-white border border-gray-300 z-50">
                  <SelectValue placeholder="Choose worker..." />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 shadow-lg z-[60]">
                  {workers.map((worker) => (
                    <SelectItem key={worker.id} value={worker.id} className="hover:bg-gray-100">
                      <div className="flex items-center justify-between w-full">
                        <span>
                          {worker.name} <span className="text-xs text-muted-foreground">({worker.department})</span>
                        </span>
                        <Badge variant={worker.currentWorkload > 3 ? "destructive" : "secondary"} className="ml-2">
                          {worker.currentWorkload} tasks
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Worker Details */}
            {selectedWorkerData && (
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Worker Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <strong className="mr-2">Name:</strong>
                        <span>{selectedWorkerData.name}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <strong className="mr-2">Designation:</strong>
                        <span>{selectedWorkerData.designation}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-3 w-3 mr-2" />
                        <span>{selectedWorkerData.phone}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Mail className="h-3 w-3 mr-2" />
                        <span>{selectedWorkerData.email}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <MapPin className="h-3 w-3 mr-2" />
                        <span>{selectedWorkerData.location}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <strong className="mr-2">Experience:</strong>
                        <span>{selectedWorkerData.experience}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <strong className="mr-2">Rating:</strong>
                        <span>{selectedWorkerData.rating}/5 ⭐</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-3 w-3 mr-2" />
                        <Badge variant={selectedWorkerData.currentWorkload > 3 ? "destructive" : "secondary"}>
                          {selectedWorkerData.currentWorkload} active tasks
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Resolution Time */}
            <div className="space-y-2">
              <Label htmlFor="days">Expected Resolution Time (days)</Label>
              <Input
                id="days"
                type="number"
                min="1"
                max="30"
                value={resolutionDays}
                onChange={(e) => setResolutionDays(e.target.value)}
                placeholder="Enter number of days"
                className="bg-white border border-gray-300"
              />
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!selectedWorker || !resolutionDays}>
            Forward Complaint
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
