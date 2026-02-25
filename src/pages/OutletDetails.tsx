import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building, 
  MapPin, 
  Phone, 
  Mail, 
  Users, 
  Package, 
  X,
  ArrowLeft
} from "lucide-react";
import { getOutlets, Outlet } from "@/services/databaseService";

interface OutletDetailsProps {
  onBack: () => void;
  outletId?: string; // Optional outletId passed from parent component
}

export const OutletDetails = ({ onBack, outletId: propOutletId }: OutletDetailsProps) => {
  const [outlet, setOutlet] = useState<Outlet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOutlet();
  }, [propOutletId]);

  const fetchOutlet = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Use the outletId passed as prop
      if (!propOutletId) {
        setError("No outlet ID provided");
        return;
      }
      
      // Fetch all outlets and find the one with the matching ID
      const allOutlets = await getOutlets();
      const foundOutlet = allOutlets.find(o => o.id === propOutletId);
      
      if (foundOutlet) {
        setOutlet(foundOutlet);
      } else {
        setError("Outlet not found");
      }
    } catch (err) {
      setError("Failed to fetch outlet details. Please try again.");
      console.error("Error fetching outlet:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-6 px-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-6 px-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-1">
              <h3 className="text-red-800 font-medium">Error</h3>
              <p className="text-red-700 mt-1">{error}</p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={fetchOutlet}
              className="ml-4"
            >
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!outlet) {
    return (
      <div className="container mx-auto py-6 px-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-medium">Outlet not found</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Outlets
          </Button>
        </div>
        <h1 className="text-3xl font-bold flex items-center gap-2 mt-4">
          <Building className="h-8 w-8" />
          {outlet.name} Details
        </h1>
        <p className="text-muted-foreground mt-2">
          Detailed information for {outlet.name} outlet
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <Badge className={getStatusColor(outlet.status)}>
                {outlet.status.charAt(0).toUpperCase() + outlet.status.slice(1)}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {outlet.employee_count || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {outlet.product_count || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Opening Date</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {outlet.opening_date || 'Not Set'}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Location Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location:</span>
                <span className="font-medium">{outlet.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Address:</span>
                <span className="font-medium">{outlet.address || 'Not Provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">City:</span>
                <span className="font-medium">{outlet.city || 'Not Provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">State:</span>
                <span className="font-medium">{outlet.state || 'Not Provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">ZIP Code:</span>
                <span className="font-medium">{outlet.zip_code || 'Not Provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Country:</span>
                <span className="font-medium">{outlet.country || 'Not Provided'}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone:</span>
                <span className="font-medium">{outlet.phone || 'Not Provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium">{outlet.email || 'Not Provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Manager:</span>
                <span className="font-medium">{outlet.manager || 'Not Assigned'}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Operational Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Employee Count:</span>
                <span className="font-medium">{outlet.employee_count || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Product Count:</span>
                <span className="font-medium">{outlet.product_count || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="font-medium">
                  <Badge className={getStatusColor(outlet.status)}>
                    {outlet.status.charAt(0).toUpperCase() + outlet.status.slice(1)}
                  </Badge>
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Opening Date:</span>
                <span className="font-medium">{outlet.opening_date || 'Not Set'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created:</span>
                <span className="font-medium">{outlet.created_at ? new Date(outlet.created_at).toLocaleDateString() : 'Not Available'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Updated:</span>
                <span className="font-medium">{outlet.updated_at ? new Date(outlet.updated_at).toLocaleDateString() : 'Not Available'}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Additional Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span className="font-medium">{outlet.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">ID:</span>
                <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                  {outlet.id}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};