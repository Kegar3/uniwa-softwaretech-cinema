# Cinema Ticket Booking System

## Περιγραφή
Αυτή η εφαρμογή είναι ένα σύστημα κρατήσεων εισιτηρίων κινηματογράφου, το οποίο έχει αναπτυχθεί για την εργασία στο μάθημα "Ειδικά Θέματα Τεχνολογίας Λογισμικού". Η εφαρμογή επιτρέπει στους χρήστες να κάνουν κρατήσεις για προβολές ταινιών και να διαχειρίζονται τις κρατήσεις τους.

## Τεχνολογίες που χρησιμοποιούνται
- **Front-end**: React.js
- **Back-end**: Node.js με Express
- **Database**: MySQL (μέσω Sequelize ORM)
- **Authentication**: JWT (JSON Web Tokens)

## Προαπαιτούμενα
- Node.js
- MySQL

## Οδηγίες Εγκατάστασης

### Front-end
1. Μεταβείτε στον φάκελο `cinema-frontend`:
    ```bash
    cd cinema-frontend
    ```
2. Εγκαταστήστε τις εξαρτήσεις:
    ```bash
    npm install
    ```
3. Εκκινήστε την εφαρμογή:
    ```bash
    npm run dev
    ```

### Back-end
1. Μεταβείτε στον φάκελο [cinema-backend](http://_vscodecontentref_/2):
    ```bash
    cd cinema-backend
    ```
2. Εγκαταστήστε τις εξαρτήσεις:
    ```bash
    npm install
    ```
3. Δημιουργήστε ένα αρχείο `.env` και προσθέστε τις παρακάτω μεταβλητές περιβάλλοντος:
    ```env
    DATABASE_NAME=your_database_name
    DATABASE_USER=your_database_user
    DATABASE_PASSWORD=your_database_password
    DATABASE_HOST=your_database_host
    DATABASE_DIALECT=mysql
    JWT_SECRET=your_jwt_secret
    PORT=3000
    ```
4. Εκκινήστε την εφαρμογή:
    ```bash
    npm start
    ```

## Χρήση
1. Ανοίξτε τον browser και μεταβείτε στη διεύθυνση που υπάγει το vite για να δείτε την εφαρμογή.
2. Δημιουργήστε έναν λογαριασμό ή συνδεθείτε για να κάνετε κρατήσεις.

## Διαθέσιμες Διαδρομές (API Endpoints)
### Users
- `POST /register`: Δημιουργία νέου χρήστη
- `POST /login`: Σύνδεση χρήστη
- `GET /users/me`: Ανάκτηση στοιχείων του τρέχοντος χρήστη
- `GET /users`: Ανάκτηση όλων των χρηστών (μόνο για Admins)
- `GET /users/:id`: Ανάκτηση συγκεκριμένου χρήστη βάσει ID
- `PUT /users/:id`: Ενημέρωση χρήστη
- `DELETE /users/:id`: Διαγραφή χρήστη (μόνο για Admins)

### Movies
- `POST /movies`: Δημιουργία νέας ταινίας (μόνο για Admins)
- `GET /movies`: Ανάκτηση όλων των ταινιών
- `GET /movies/:id`: Ανάκτηση μιας ταινίας βάσει ID
- `PUT /movies/:id`: Ενημέρωση ταινίας (μόνο για Admins)
- `DELETE /movies/:id`: Διαγραφή ταινίας (μόνο για Admins)
- `GET /movies/:id/showtimes`: Ανάκτηση προβολών μιας ταινίας

### Showtimes
- `POST /showtimes`: Δημιουργία νέας προβολής (μόνο για Admins)
- `GET /showtimes`: Ανάκτηση όλων των προβολών
- `GET /showtimes/:id`: Ανάκτηση συγκεκριμένης προβολής βάσει ID
- `PUT /showtimes/:id`: Ενημέρωση προβολής (μόνο για Admins)
- `DELETE /showtimes/:id`: Διαγραφή προβολής (μόνο για Admins)
- `GET /showtimes/:id/seats`: Ανάκτηση διαθέσιμων θέσεων
- `GET /showtimes/:id/reservations`: Ανάκτηση κρατήσεων μιας προβολής

### Reservations
- `POST /reservations`: Δημιουργία νέας κράτησης (χρειάζεται authentication)
- `GET /reservations/user/:userId`: Ανάκτηση κρατήσεων για συγκεκριμένο χρήστη (μόνο ο ίδιος ή ένας admin)
- `GET /reservations/:id`: Ανάκτηση κράτησης με ID (μόνο αν είναι ο ιδιοκτήτης ή admin)
- `PUT /reservations/:id`: Ενημέρωση κράτησης (μόνο ο ιδιοκτήτης ή admin)
- `DELETE /reservations/:id`: Διαγραφή κράτησης (μόνο ο ιδιοκτήτης ή admin)

### Admin
- `GET /admin/stats`: Ανάκτηση στατιστικών για τον διαχειριστή (μόνο για Admins)


## Άδεια Χρήσης
Αυτή η εφαρμογή διατίθεται υπό την άδεια MIT.
