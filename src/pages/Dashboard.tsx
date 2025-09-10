import { useState, useMemo } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import { ComplaintCard } from "@/components/dashboard/ComplaintCard";
import { FilterSection, FilterState } from "@/components/dashboard/FilterSection";
import { ForwardModal } from "@/components/dashboard/ForwardModal";
import { demoComplaints, Complaint } from "@/data/demoData";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showForwardModal, setShowForwardModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const { toast } = useToast();

  const [filters, setFilters] = useState<FilterState>({
    state: "",
    city: "",
    age: "",
    upvotes: "",
    dateFrom: "",
    dateTo: "",
  });

  const tabs = [
    { label: "Pending", status: "Pending" },
    { label: "Forwarded", status: "Forwarded" },
    { label: "Resolved", status: "Resolved" },
    { label: "Cancelled", status: "Cancelled" },
    { label: "All", status: "All" },
  ] as const;

  const filteredComplaints = useMemo(() => {
    let filtered = demoComplaints;

    if (tabs[activeTab].status !== "All") {
      filtered = filtered.filter((c) => c.status === tabs[activeTab].status);
    }
    if (filters.state) filtered = filtered.filter((c) => c.state === filters.state);
    if (filters.city) filtered = filtered.filter((c) => c.city === filters.city);
    if (filters.age) filtered = filtered.filter((c) => c.age === filters.age);
    if (filters.upvotes) {
      filtered = filters.upvotes === "High" ? filtered.filter((c) => c.upvotes >= 50) : filtered.filter((c) => c.upvotes < 50);
    }
    if (filters.dateFrom) filtered = filtered.filter((c) => c.date >= filters.dateFrom);
    if (filters.dateTo) filtered = filtered.filter((c) => c.date <= filters.dateTo);

    return filtered;
  }, [activeTab, filters]);

  const handleTabChange = (_e: React.SyntheticEvent, newValue: number) => setActiveTab(newValue);

  const handleViewDetails = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setShowDetailsModal(true);
  };

  const handleForward = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setShowForwardModal(true);
  };

  const handleViewMap = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setShowMapModal(true);
  };

  const handleApplyFilters = () => {
    // useMemo applies filters
    console.log("Filters applied:", filters);
  };

  const handleClearFilters = () => {
    setFilters({
      state: "",
      city: "",
      age: "",
      upvotes: "",
      dateFrom: "",
      dateTo: "",
    });
  };

  // department removed from signature & toast
  const handleForwardComplaint = (complaintId: string, workerId: string, days: number) => {
    toast({
      title: "Complaint Forwarded",
      description: `Complaint ${complaintId} has been assigned to worker ${workerId}. Expected resolution in ${days} days.`,
    });
    console.log("Forwarding complaint:", { complaintId, workerId, days });
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Complaint Management</h1>
          <p className="text-muted-foreground mt-1">Monitor and manage citizen complaints</p>
        </div>
      </div>

      <FilterSection filters={filters} onFiltersChange={setFilters} onApplyFilters={handleApplyFilters} onClearFilters={handleClearFilters} />

      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            {tabs.map((tab) => (
              <Tab
                key={tab.label}
                label={`${tab.label} (${
                  tab.status === "All" ? demoComplaints.length : demoComplaints.filter((c) => c.status === tab.status).length
                })`}
              />
            ))}
          </Tabs>
        </Box>

        {tabs.map((tab, index) => (
          <TabPanel key={tab.label} value={activeTab} index={index}>
            {filteredComplaints.length === 0 ? (
              <div className="text-center py-12">
                <Typography variant="h6" className="text-muted-foreground mb-2">
                  No complaints found
                </Typography>
                <Typography variant="body2" className="text-muted-foreground">Try adjusting your filters or check a different tab</Typography>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredComplaints.map((complaint) => (
                  <ComplaintCard
                    key={complaint.id}
                    complaint={complaint}
                    onViewDetails={handleViewDetails}
                    onForward={handleForward}
                    onViewMap={handleViewMap}
                  />
                ))}
              </div>
            )}
          </TabPanel>
        ))}
      </Box>

      {/* Details Modal */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Complaint Details - {selectedComplaint?.id}</DialogTitle>
          </DialogHeader>
          {selectedComplaint && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold">User:</p>
                  <p className="text-muted-foreground">{selectedComplaint.user}</p>
                </div>
                <div>
                  <p className="font-semibold">Date:</p>
                  <p className="text-muted-foreground">{formatDate(selectedComplaint.date)}</p>
                </div>
                <div>
                  <p className="font-semibold">Status:</p>
                  <p className="text-muted-foreground">{selectedComplaint.status}</p>
                </div>
                {/* Department removed */}
              </div>

              <div>
                <p className="font-semibold">Description:</p>
                <p className="text-muted-foreground mt-1">{selectedComplaint.description}</p>
              </div>

              <div>
                <p className="font-semibold">Location:</p>
                <p className="text-muted-foreground mt-1">{selectedComplaint.location.address}</p>
              </div>

              {selectedComplaint.media.photos?.length ? (
                <div>
                  <p className="font-semibold mb-2">Photos:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedComplaint.media.photos.map((photo, index) => (
                      <img key={index} src={photo} alt={`Complaint ${index + 1}`} className="w-full h-32 object-cover rounded" />
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowDetailsModal(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Forward Modal */}
      <ForwardModal complaint={selectedComplaint} isOpen={showForwardModal} onClose={() => setShowForwardModal(false)} onForward={handleForwardComplaint} />

      {/* Map Modal */}
      <Dialog open={showMapModal} onOpenChange={setShowMapModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Location - {selectedComplaint?.location.address}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">
                Map view for coordinates: {selectedComplaint?.location.lat}, {selectedComplaint?.location.lng}
              </p>
            </div>
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setShowMapModal(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
