
---

# Postgraduate Entrance Exam Information Recommendation System

This project is a **Postgraduate Entrance Examination Information Recommendation System** based on the K-Nearest Neighbors (KNN) algorithm. It is designed to provide personalized recommendations for universities and exam preparation materials for students aiming for postgraduate entrance exams.

## Features

- **Personalized Recommendations**: Utilizing the KNN algorithm, the system offers tailored university and book recommendations based on user preferences and previous interactions.
- **Fast Query**: The system provides quick access to exam-related information, including universities, exam subjects, and preparation materials.
- **User-friendly Interface**: A clean, responsive UI ensures users can navigate and find information easily.
- **High Compatibility**: The system is accessible across different platforms, including desktop and mobile.
- **Security**: It includes strong data security and privacy measures, such as encryption and secure data transmission.

## Technologies

The project leverages several key technologies:
- **React** for front-end development to ensure a dynamic and responsive user interface.
- **Spring Boot** for building the back-end service and managing API requests.
- **MySQL** as the primary database to store user data, university information, and exam resources.
- **Scrapy** to collect and update information from external sources like the Postgraduate Admissions Network.

## System Modules

1. **User Information Module**: Handles user registration, login, and profile management.
2. **University Information Query Module**: Enables users to search for and view details about postgraduate programs at various universities.
3. **Subject Query Module**: Allows users to search for exam subjects and view associated details.
4. **Book Query Module**: Provides access to a curated list of exam preparation books.
5. **Favorite and Recommendation Module**: Users can save favorite universities and books, and receive recommendations based on KNN.
6. **News Module**: Displays exam-related news and updates using a random selection algorithm.

## Installation

To run this project locally:

1. Clone the repository:

    ```bash
    git clone https://github.com/TelepathyMaster/MasterEntranceExamInfoSystem.git
    ```

2. Navigate to the front-end directory and install dependencies:

    ```bash
    cd NextDemo
    npm install
    ```

3. Navigate to the back-end directory and build the Spring Boot application:

    ```bash
    cd ../MasterExamInfoSystem
    mvn clean install
    ```

4. Start the front-end server:

    ```bash
    npm run dev
    ```

5. Start the back-end server:

    ```bash
    mvn spring-boot:run
    ```

6. Access the application at `http://localhost:3000`.

## Project Structure

- **Frontend**: Front-end code built with React and Next.js.
- **Backend**: Back-end service built with Spring Boot, handling REST APIs and database interactions.

## Database

The system uses MySQL to store user information, universities, exam details, and books. Data is collected through a web scraping service using Python's Scrapy framework.

## Future Enhancements

- **Improved Performance**: Further optimization of the query and recommendation algorithms for handling high concurrency.
- **Additional Recommendation Algorithms**: Exploring collaborative filtering and content-based recommendation systems.
- **Expanded Data**: Continuous updates to the database to include more universities and preparation resources.
- **New Features**: Potentially adding features like online study resources, score tracking, and exam simulations.

## License

This project is open-source and available under the [MIT License](LICENSE).

---

Feel free to modify or expand upon this based on additional project details or requirements.