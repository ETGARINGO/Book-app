import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, Clock, User, Scissors, RefreshCw, AlertCircle } from "lucide-react";
import { services, barbers, type Booking } from "@shared/schema";
import { format, parseISO, isToday, isTomorrow, isPast } from "date-fns";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  confirmed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  completed: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

export default function Admin() {
  const { data: bookings, isLoading, error, refetch, isRefetching } = useQuery<Booking[]>({
    queryKey: ["/api/bookings"],
    refetchInterval: 30000,
  });
  
  const getServiceName = (serviceId: string) => {
    return services.find(s => s.id === serviceId)?.name || serviceId;
  };
  
  const getBarberName = (barberId: string) => {
    return barbers.find(b => b.id === barberId)?.name || barberId;
  };
  
  const getDateLabel = (dateStr: string) => {
    try {
      const date = parseISO(dateStr);
      if (isToday(date)) return "Today";
      if (isTomorrow(date)) return "Tomorrow";
      return format(date, "EEE, MMM d");
    } catch {
      return dateStr;
    }
  };
  
  const sortedBookings = bookings?.slice().sort((a, b) => {
    const dateA = `${a.date} ${a.time}`;
    const dateB = `${b.date} ${b.time}`;
    return dateA.localeCompare(dateB);
  });
  
  const upcomingBookings = sortedBookings?.filter(b => {
    try {
      const bookingDate = parseISO(b.date);
      return !isPast(bookingDate) || isToday(bookingDate);
    } catch {
      return true;
    }
  });
  
  const todayBookings = sortedBookings?.filter(b => {
    try {
      return isToday(parseISO(b.date));
    } catch {
      return false;
    }
  });
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 
                className="font-display text-3xl md:text-4xl uppercase tracking-wide"
                data-testid="text-admin-title"
              >
                Bookings Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage and view all customer appointments
              </p>
            </div>
            
            <Button
              variant="outline"
              onClick={() => refetch()}
              disabled={isRefetching}
              data-testid="button-refresh"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefetching ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Today's Appointments</CardDescription>
                <CardTitle className="text-3xl" data-testid="text-today-count">
                  {isLoading ? <Skeleton className="h-9 w-12" /> : todayBookings?.length || 0}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{format(new Date(), "EEEE, MMMM d")}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Upcoming Bookings</CardDescription>
                <CardTitle className="text-3xl" data-testid="text-upcoming-count">
                  {isLoading ? <Skeleton className="h-9 w-12" /> : upcomingBookings?.length || 0}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Next 2 weeks</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Bookings</CardDescription>
                <CardTitle className="text-3xl" data-testid="text-total-count">
                  {isLoading ? <Skeleton className="h-9 w-12" /> : bookings?.length || 0}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span>All time</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">All Bookings</CardTitle>
              <CardDescription>
                Synced with Google Sheets in real-time
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                      <Skeleton className="h-6 w-20" />
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <AlertCircle className="w-12 h-12 text-destructive mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Failed to Load Bookings</h3>
                  <p className="text-muted-foreground mb-4">
                    There was an error connecting to Google Sheets.
                  </p>
                  <Button onClick={() => refetch()} data-testid="button-retry">
                    Try Again
                  </Button>
                </div>
              ) : !bookings || bookings.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Calendar className="w-12 h-12 text-muted-foreground mb-4" />
                  <h3 className="font-semibold text-lg mb-2">No Bookings Yet</h3>
                  <p className="text-muted-foreground">
                    Bookings will appear here once customers start making appointments.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Barber</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedBookings?.map((booking, index) => (
                        <TableRow key={booking.id || index} data-testid={`row-booking-${index}`}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{booking.customerName}</p>
                              <p className="text-sm text-muted-foreground">{booking.customerEmail}</p>
                              <p className="text-sm text-muted-foreground">{booking.customerPhone}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Scissors className="w-4 h-4 text-muted-foreground" />
                              <span>{getServiceName(booking.serviceId)}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-muted-foreground" />
                              <span>{getBarberName(booking.barberId)}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span>{getDateLabel(booking.date)}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span>{booking.time}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant="secondary"
                              className={statusColors[booking.status || "pending"]}
                            >
                              {booking.status || "pending"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
