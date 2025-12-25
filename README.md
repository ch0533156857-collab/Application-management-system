# 🎫 Ticket Management System

מערכת ניהול טיקטים מודרנית עם ממשק משתמש גרפיטי מגניב, בנויה עם React ו-TypeScript.

## 📋 תיאור הפרויקט

מערכת לניהול בקשות (טיקטים) שמאפשרת:
- **לקוחות (Customers)**: יצירת טיקטים, עדכון סטטוס, תגובות
- **סוכנים (Agents)**: קבלת טיקטים, טיפול בהם, שינוי עדיפות
- **מנהלים (Admins)**: ניהול משתמשים, סטטוסים, עדיפויות, הקצאת סוכנים

## 🚀 התחלה מהירה

### דרישות מקדומות
- Node.js 18+
- npm או yarn

### התקנה והרצה

```bash
# התקנת תלויות
npm install

# הרצה בפיתוח
npm run dev

# בנייה ל-production
npm run build
```

השרת יפתח ב-`http://localhost:5173`

## 📦 ספריות משתמשות

### Frontend
- **React 19** - ספריית ה-UI
- **TypeScript** - typing חזק
- **Vite** - build tool מהיר
- **React Router** - ניווט בין עמודים
- **React Select** - dropdowns מתקדמים
- **React Spinners** - אנימציות טעינה
- **React Hot Toast** - הודעות toast עם עיצוב גרפיטי ✨

### Styling
- CSS custom variables עם פלטת צבעים גרפיטית
- Gradients, shadows ו-animations מודרניים
- גופנים: Bebas Neue, Oswald, Montserrat

## 📁 מבנה הפרויקט

```
src/
├── pages/           # עמודי אפליקציה
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   ├── TicketsPage.tsx
│   ├── TicketDetailsPage.tsx
│   ├── NewTicketPage.tsx
│   ├── ManageUsersPage.tsx
│   ├── ManageStatusPage.tsx
│   ├── ManagePriorityPage.tsx
│   └── NotFoundPage.tsx
├── components/      # קומפוננטות משוקללות
│   ├── Navbar.tsx
│   ├── ProtectedRoute.tsx
│   ├── CommentList.tsx
│   ├── TicketCard.tsx
│   ├── TicketDetailsCard.tsx
│   ├── TicketForm.tsx
│   └── StatCard.tsx
├── services/        # API calls
│   ├── api.ts
│   ├── authService.ts
│   ├── ticketService.ts
│   ├── commentService.ts
│   ├── userService.ts
│   ├── statusService.ts
│   └── prioritiesService.ts
├── context/         # State management
│   └── AuthContext.tsx
├── types/           # TypeScript types
│   ├── Ticket.ts
│   ├── User.ts
│   ├── Comment.ts
│   ├── Status.ts
│   ├── Priority.ts
│   └── Error.ts
└── index.css        # סגנונות גלובליים
```

## 🎨 עיצוב

### Graffiti Style
- **צבעים עיקריים**: שחור/לבן עם accent colors
- **Accents**: ורוד (#ff006e), כחול ניאון (#00d9ff), סגול (#9b2e7f)
- **אנימציות**: bounce, shake, pulse-glow
- **גבולות עבים** וצללים לוהטים

### Toast Notifications
- ✅ Success: גרדיאנט כחול-ירוק עם bounce
- ❌ Error: גרדיאנט אדום-ורוד עם shake

## 🔐 אבטחה

- Authentication עם JWT tokens
- Protected routes ל-admin ו-agents בלבד
- Role-based access control (RBAC)

## 📝 הודעות המערכת (Toast)

הפרויקט משתמש ב-react-hot-toast עם עיצוב גרפיטי מגניב:
- הודעות לכל פעולה (הוסף, עדכן, שגיאה)
- עיצוב ייחודי לכל סוג הודעה
- אנימציות חלקות ותופעות מיוחדות

## 🛠️ Available Scripts

```bash
npm run dev          # Vite dev server
npm run build        # בנייה ל-production
npm run lint         # ESLint check
npm run preview      # תצוגה מקומית של build
```

## 📧 ערוצי תקשורת

- API Server: `http://localhost:4000`
- Frontend: `http://localhost:5173`

---

**ניתן לשימוש חופשי למטרות לימודיות ופיתוח!** 🚀
