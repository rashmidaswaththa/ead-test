import Home from "./components/Home";
import Token from "./components/ExpiredToken";
import Officer from "./components/OfficerHome";
import Navbar from "./components/Navbar";
import Agent from "./components/AgentHome"

//Import for Traveler
import AddTraveler from "./components/Traveler/AddTraveler";
import TList from "./components/Traveler/TravelListBackup";
import TravelerEdit from "./components/Traveler/EditTravelerBackup";


//Import for User
import Register from "./components/User/Register";
import LoginUser from "./components/User/LoginUser";
import UserListNew from "./components/User/UserListBackup";
import UserEdit from "./components/User/EditUserBackup";
import AddUser from "./components/User/AddUser";

//Imports for Train
import AddTrain from "./components/Train/AddTrain";
import TrainList from "./components/Train/TrainList";
import EditTrain from "./components/Train/EditTrain";

//Imports for Schedule
import AddSchedule from "./components/Schedule/AddSchedule";
import ScheduleList from "./components/Schedule/ScheduleList";
import EditSchedule from "./components/Schedule/EditSchedule";

//Import for Booking
import AddBooking from "./components/Booking/AddBooking";
import AddBookingSummary from "./components/Booking/AddBookingSummary";
import BookingList from "./components/Booking/BookingList";

const AppRoutes = [
  //home paths
  {
    index: true,
    element: <Home />
  },
  {
    path: '/officer',
    element: <Officer />
  },
  {
    path: '/navbar',
    element: <Navbar />
  },
  {
    path: '/agent',
    element: <Agent />
  },
  //traveler paths
  {
    path: '/addTraveler',
    element: <AddTraveler />
  },
  {
    path: '/list',
    element: <TList />
  },
  {
    path: '/editTraveler',
    element: <TravelerEdit />
  },
  //train paths
  {
    path: '/addTrain',
    element: <AddTrain />
  },
  {
    path: '/trainList',
    element: <TrainList />
  },
  {
    path: '/editTrain/:id',
    element: <EditTrain />
  },
  //schedule paths
  {
    path: '/addSchedule',
    element: <AddSchedule />
  },
  {
    path: '/scheduleList',
    element: <ScheduleList />
  }, {
    path: '/editSchedule/:id',
    element: <EditSchedule />
  },
  //user paths
  {
    path: '/addUser',
    element: <AddUser />
  },
  {
    path: '/login',
    element: <LoginUser />
  },
  {
    path: '/token',
    element: <Token />
  },
  {
    path: '/listUser',
    element: <UserListNew />
  },
  {
    path: '/userEdit',
    element: <UserEdit />
  },
  {
    path: '/register',
    element: <Register />
  },
  //booking paths
  {
    path: '/addBooking/:id',
    element: <AddBooking />
  },
  {
    path: '/bookingList',
    element: <BookingList />
  },
  {
    path: '/bookingSummary',
    element: <AddBookingSummary />
  }
];

export default AppRoutes;
