# Task Master

A simple and elegant task management application built with vanilla JavaScript, HTML5, and CSS3. This project demonstrates core web development concepts including DOM manipulation, local storage, event handling, and responsive design with a modern dark/light theme toggle.

## Features

- ✅ Full CRUD operations for tasks (Create, Read, Update, Delete)
- ✅ Real-time task filtering (All, Active, Completed)
- ✅ Dark/Light theme toggle with persistent preferences
- ✅ Local storage for automatic data persistence
- ✅ Smooth animations and transitions
- ✅ Responsive design optimized for desktop and mobile
- ✅ Intuitive UI with Font Awesome icons
- ✅ Clean, well-commented code for learning

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Storage**: Browser LocalStorage API
- **Icons**: Font Awesome 6.0.0
- **Fonts**: Google Fonts (Outfit)
- **Styling**: CSS3 Flexbox & Grid with CSS Variables for theming

## Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No backend server or installation required
- No build tools or dependencies needed

## Getting Started

### 1. Clone or Download the Project
```bash
git clone https://github.com/yourusername/Task-Master.git
cd Task-Master
```

### 2. Open the Application
Simply open `index.html` in your web browser:
- **Option 1**: Double-click `index.html`
- **Option 2**: Right-click → Open with → Your preferred browser
- **Option 3**: Use a local server (recommended for development):
  ```bash
  # Using Python 3
  python -m http.server 8000
  
  # Using Node.js (with http-server package)
  npx http-server
  ```
  Then navigate to `http://localhost:8000`

### 3. Start Managing Tasks
- Type a task in the input field
- Click "Add Task" or press Enter
- Use the filter buttons to view All, Active, or Completed tasks
- Toggle the theme switch for dark/light mode
- Edit tasks by clicking the edit button, or delete them with the delete button

## User Interface

### Main Components

| Component | Function |
|-----------|----------|
| **Input Field** | Enter new tasks |
| **Add Task Button** | Create a new task |
| **Filter Buttons** | Toggle between All, Active, and Completed tasks |
| **Theme Toggle** | Switch between light and dark mode |
| **Edit Button** | Modify an existing task |
| **Delete Button** | Remove a task |
| **Checkbox** | Mark a task as completed or active |

### Task States

- **Active**: Uncompleted tasks displayed at the top
- **Completed**: Completed tasks displayed below active tasks (with strikethrough)
- **All**: Shows both active and completed tasks

## Usage Examples

**Adding a Task**
```
Input: "Complete project documentation"
Action: Click "Add Task" or press Enter
Result: Task appears at the top of the list
```

**Completing a Task**
```
Action: Click the checkbox next to a task
Result: Task is marked as completed, moves below active tasks, and gets strikethrough styling
```

**Editing a Task**
```
Action: Click the edit button (pencil icon)
Interaction: Task text becomes editable
Action: Update text and press Enter or click outside
Result: Task is updated in the list and saved to local storage
```

**Filtering Tasks**
```
Action: Click "Active" button
Result: Only incomplete tasks are displayed
Action: Click "Completed" button
Result: Only finished tasks are displayed
```

**Switching Themes**
```
Action: Toggle the theme switch at the top
Result: UI switches between light and dark mode; preference is saved
```

## Project Structure

```
Task-Master/
├── index.html              # Main HTML structure
├── script.js               # JavaScript logic (CRUD, filtering, theming)
├── style.css               # CSS styling and theme variables
├── README.md               # This file
├── assets/
│   └── icons/
│       └── checked.png     # Favicon
└── .gitignore              # Git ignore file
```

## How It Works

### Core Architecture

1. **HTML Structure**: Semantic HTML layout with input, filter buttons, and task list container
2. **CSS Styling**: CSS3 with custom properties for theme switching, flexbox for layout, and smooth animations
3. **JavaScript Logic**:
   - Loads tasks from localStorage on page load
   - Manages task CRUD operations
   - Handles filtering and sorting
   - Persists data to localStorage on every change
   - Manages light/dark theme preferences

### Key Functions

- `addTask(text)` - Creates a new task with unique ID
- `createTaskElement(task)` - Generates DOM elements for tasks
- `filterTasks(filter)` - Shows/hides tasks based on filter type
- `sortTasks()` - Keeps completed tasks at the bottom
- `saveTasks()` - Persists tasks to localStorage
- Theme management - Toggles dark mode CSS class

## Data Persistence

Tasks are automatically saved to your browser's LocalStorage under the key `"tasks"`. This means:
- Your tasks persist across browser sessions
- Clearing browser cache/storage will delete tasks
- Each browser has its own separate task list
- No server or database required

## Theme System

The application uses CSS custom properties (CSS variables) for easy theme switching:
- **Light Mode**: Light background with dark text (default)
- **Dark Mode**: Dark background with light text
- Theme preference is saved to localStorage and restored on page load

## Responsive Design

The application is fully responsive and works on:
- Desktop browsers (1920px and above)
- Tablets (768px to 1024px)
- Mobile devices (320px to 767px)

Mobile features:
- Touch-friendly buttons and checkboxes
- Full-width layout optimization
- Readable font sizes on all devices

## Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Enter | Add task or save edited task |
| Escape | Cancel task editing |

## Future Enhancements

- Add task categories or tags
- Implement task priority levels
- Add due dates and reminders
- Create task statistics and analytics
- Export/import tasks (JSON or CSV)
- Add keyboard shortcuts for common actions
- Implement undo/redo functionality
- Add task search functionality
- Create subtasks support
- Integrate with cloud storage (Firebase, etc.)

## Notes

- **Data Storage**: All data is stored locally in your browser using LocalStorage
- **No Backend**: This is a pure frontend application with no server requirements
- **Learning Purpose**: Designed as a learning project for web development fundamentals
- **Privacy**: All data remains on your device—nothing is sent to external servers

## Troubleshooting

**Tasks not appearing after refresh?**
- Check if LocalStorage is enabled in your browser
- Ensure cookies/storage is not being cleared automatically

**Theme not saving?**
- Verify LocalStorage is enabled
- Check browser storage limits

**Editing not working?**
- Make sure JavaScript is enabled in your browser
- Try refreshing the page

## License

This is a learning/educational project. Feel free to use, modify, and distribute as needed.
