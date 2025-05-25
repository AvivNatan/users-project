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

## 🗂️ מבנה הפרויקט

```
user-management-app/
│
├── client/                         ← פרויקט Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── users/
│   │   │   │   └── user-details/
│   │   │   └── services/
│   │   ├── environments/
│   └── angular.json
│
├── server/                         ← פרויקט ASP.NET Core
│   ├── Controllers/
│   │   └── UsersController.cs
│   ├── Models/
│   ├── DTOs/
│   │   └── DtoEmail.cs
│   ├── Services/
│   ├── appsettings.json
│   ├── Program.cs
│   └── UserManagementApp.csproj
│
└── README.md
```

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

3. ריצי את השרת:

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

---

## 🔄 עדכון מין המשתמש

- בעת שינוי הטוגל, נשלחת בקשה לשרת:

```ts
this.http.post(url, { email: user.email });
```

- בצד השרת מתקבל אובייקט מסוג `DtoEmail`:

```csharp
[HttpPost("update")]
public async Task<IActionResult> updateIsGirl([FromBody] DtoEmail dtoEmail)
{
    var result = await this.m_UserService.updateGender(dtoEmail.email);
    ...
}
```

- הערך `isGirl` מתהפך ללא צורך בשליחה של ערך חדש מהקליינט.

---

## 📌 הערות

- אין שימוש ב־State גלובלי. כל פרטי המשתמש מועברים בין קומפוננטות באמצעות פרמטרים בניתוב (Router).
- רענון הדף בדף פרטי המשתמש יוביל לאובדן מידע – אלא אם תיבנה קריאה חוזרת לשרת או אחסון נתונים מתמשך.
- כל התקשורת נעשית על בסיס REST, ואין צורך ב־SignalR או WebSockets.

---

## 🧠 הצעות להרחבה עתידית

- אחסון המידע במנגנון State (NGRX / Service גלובלי)
- אפשרות לערוך פרטי משתמש נוספים
- הוספת תצוגת טפסים, אימותים ו־Toasts להודעות מערכת
- הגנה על נתיבים באמצעות AuthGuard

---

## 👤 פיתחה: אביב נתן

*סטודנטית למדעי המחשב | המכללה האקדמית תל אביב-יפו*  
*פרויקט פיתוח Fullstack כחלק מלימודי התואר*
