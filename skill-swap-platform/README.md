# Skill Swap Platform

A beautiful, modern web application where people can showcase their skills and collaborate with others through skill exchanges. Built with React and featuring a sleek dark UI design.

## 🚀 Features

### Core Functionality
- **User Registration & Authentication**: Secure login system with local storage
- **Profile Management**: Create and edit detailed user profiles
- **Skills Showcase**: Display skills you offer and want to learn
- **Search & Discovery**: Find users by skills, location, or availability
- **Skill Swap Requests**: Send and receive collaboration requests
- **Request Management**: Accept, reject, and track skill exchange requests

### User Experience
- **Beautiful Dark UI**: Modern, responsive design with smooth animations
- **Real-time Search**: Instant filtering and search results
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Intuitive Navigation**: Easy-to-use interface with clear visual hierarchy
- **Interactive Elements**: Hover effects and smooth transitions

## 🎨 Design Features

- **Dark Theme**: Professional dark color scheme matching the wireframes
- **Modern Components**: Clean cards, buttons, and form elements
- **Smooth Animations**: Subtle hover effects and transitions
- **Responsive Layout**: Mobile-first design that adapts to all screen sizes
- **Visual Feedback**: Clear status indicators and success messages

## 🛠️ Technologies Used

- **Frontend**: React 18, React Router DOM
- **State Management**: React Context API
- **Styling**: Pure CSS with modern features
- **Data Storage**: Local Storage (for demo purposes)
- **Icons**: Unicode symbols and CSS-based designs

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd skill-swap-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📱 How to Use

### For New Users

1. **Visit the Homepage**
   - Browse public profiles without logging in
   - Use search and filters to find specific skills
   - Note: You need to login to make requests

2. **Create an Account**
   - Click "Login" in the header
   - Switch to "Register" mode
   - Fill in your profile information
   - Add skills you offer and want to learn

3. **Make Your First Request**
   - Browse user profiles on the homepage
   - Click "Request" on a user's profile
   - Select matching skills for the exchange
   - Write a personalized message

### For Existing Users

**Demo Account**: Use `marc@demo.com` with password `password123`

1. **Login**
   - Use the demo account or your registered account
   - Access your profile and requests from the header

2. **Manage Your Profile**
   - Click "Profile" to edit your information
   - Add/remove skills as you learn new ones
   - Update your availability and location

3. **Handle Requests**
   - Click "Requests" to see all incoming/outgoing requests
   - Accept or reject requests from other users
   - Filter requests by status (pending, accepted, rejected)

## 🎯 Key Pages

### 1. Home Page (/)
- **Purpose**: Browse and discover users
- **Features**: Search, filter by availability, pagination
- **Access**: Public (no login required)

### 2. Login Page (/login)
- **Purpose**: User authentication and registration
- **Features**: Login/register toggle, skills management during signup
- **Access**: Public

### 3. Profile Page (/profile)
- **Purpose**: Edit personal information and skills
- **Features**: Profile editing, skills management, visibility settings
- **Access**: Authenticated users only

### 4. Request Form (/request/:userId)
- **Purpose**: Create skill swap requests
- **Features**: Skill selection, message composition, target user preview
- **Access**: Authenticated users only

### 5. Requests Page (/requests)
- **Purpose**: Manage all skill swap requests
- **Features**: Filter by status, search, accept/reject actions
- **Access**: Authenticated users only

## 🔧 Technical Architecture

### Context Providers
- **AuthContext**: Manages user authentication and profile updates
- **DataContext**: Handles all data operations and mock data

### Components
- **Header**: Navigation and user authentication status
- **UserCard**: Displays user profiles with skills and rating
- **Pages**: Individual page components for each route

### Data Flow
1. **Local Storage**: All data persists in browser storage
2. **Context API**: Centralized state management
3. **Mock Data**: Pre-populated with demo users and requests

## 🎨 UI/UX Highlights

### Visual Design
- **Color Scheme**: Dark theme with blue accents (#007bff)
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent padding and margins throughout
- **Cards**: Elevated design with hover effects

### Interactive Elements
- **Buttons**: Multiple variants (primary, secondary, success, danger)
- **Forms**: Styled inputs with focus states
- **Navigation**: Smooth transitions between pages
- **Feedback**: Success/error messages and loading states

### Responsive Features
- **Mobile-first**: Optimized for small screens
- **Grid Layout**: Adapts to different screen sizes
- **Touch-friendly**: Adequate button sizes and spacing
- **Readable**: Proper font sizes and contrast

## 🚀 Future Enhancements

### Potential Features
- **Real-time Chat**: Direct messaging between users
- **Video Calls**: Integrated video conferencing
- **Rating System**: User feedback and ratings
- **Skill Verification**: Badges and certifications
- **Advanced Matching**: AI-powered skill recommendations

### Technical Improvements
- **Backend Integration**: Real database and API
- **Authentication**: OAuth and social login
- **Real-time Updates**: WebSocket connections
- **File Upload**: Profile pictures and portfolios
- **Search Enhancement**: Elasticsearch or similar

## 📝 Development Notes

### Code Organization
- Clean component structure with separation of concerns
- Consistent naming conventions throughout
- Proper error handling and loading states
- Responsive design patterns

### Best Practices
- **Performance**: Efficient re-renders and state updates
- **Accessibility**: Semantic HTML and proper ARIA labels
- **SEO**: Proper meta tags and structured data
- **Security**: Input validation and sanitization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Design inspiration from the provided wireframes
- React community for excellent documentation
- Modern web design principles and best practices

---

**Built with ❤️ for the skill-sharing community**
