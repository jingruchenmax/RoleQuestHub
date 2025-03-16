# RoleQuestHub
 A dashboard for immersion and interaction in mystery boardgames and TTRPG.

## System Overview
The web application consists of two types of users:
Players (Regular Users) - Limited read-only access with specific permissions
Admins - Full control over character cards, documents, and messages
## Tech Stack
Frontend: React (hosted on GitHub Pages)
Backend: Firebase (Firestore for data, Authentication for login)
Storage: Firebase Storage (for documents & videos)
Messaging System: Firestore with real-time updates
## Key Functionalities
### Player Client
Login using Firebase Authentication (username & password)
View Character Card (some fields hidden)
Access Documents (view-only)
Send Messages (edit only the last unsent message, otherwise read-only)
#### Admin Client
Dashboard: View & edit all data
Manage Character Cards: Full CRUD operations
Manage Documents: Upload, modify, and delete files/videos
Manage Messages: Read/send messages, edit previous messages