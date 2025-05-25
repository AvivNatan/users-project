# users-project

# 👩‍💻 Fullstack User Management App

אפליקציית Fullstack לניהול משתמשים הכוללת ממשק טבלאי להצגת משתמשים, שינוי ערכים ב־Toggle וניווט לדף פרטי משתמש. הפרויקט מחולק לצמד פרויקטים – צד לקוח ב־Angular וצד שרת ב־ASP.NET Core – ומתחבר למסד נתונים MySQL מקומי.

---

## 🧰 טכנולוגיות בשימוש

### 🔧 Backend – ASP.NET Core
- ASP.NET Core Web API
- Entity Framework Core
- MySQL (שרת מקומי)
- Dependency Injection
- RESTful API
- DTOs ו־Services
- CORS

### 🎨 Frontend – Angular
- Angular 17
- Angular Material (MatTable, MatSlideToggle, Routing)
- TypeScript
- HttpClientModule
- Routing עם פרמטרים
- Two-Way Binding
- Event Binding

---



## ⚙️ התקנה והרצה

### ✅ צד שרת – ASP.NET Core

1. פתחי את התיקייה `server/` ב־Visual Studio או VS Code.
2. ודאי ש־MySQL רץ מקומית ושה־`appsettings.json` מוגדר כראוי:

```json
"ConnectionStrings": {
  "DefaultConnection": "server=localhost;user=root;password=your_password;database=userdb"
}
```

3. הריצי את השרת:

```bash
cd server
dotnet restore
dotnet run
```

> כתובת API ברירת מחדל: `http://localhost:5050/api/users`

---

### ✅ צד לקוח – Angular

1. פתחי את התיקייה `client/`.
2. התקיני את התלויות:

```bash
cd client
npm install
```

3. הריצי את הפרויקט:

```bash
ng serve
```

> האפליקציה תיפתח אוטומטית בדפדפן: `http://localhost:4200`

---

## ✨ פיצ'רים עיקריים

- ✅ הצגת רשימת משתמשים בטבלה עם עמודות ממוינות
- ✅ שימוש ב־`MatSlideToggle` לשינוי מין המשתמש (`isGirl`)
- ✅ שליחת בקשת POST עם אימייל בלבד לשרת שמעדכן את ערך ה־Gender
- ✅ ניתוב לדף פרטי משתמש בלחיצה על שורה בטבלה
- ✅ העברת כל פרטי המשתמש בעזרת ה־Router ולא באמצעות קריאה חדשה לשרת
