# Supermetrics assignment

- This is the return of the assignment of Supermetrics
- Demo link: https://supermetrics-trungung.netlify.app/

# Technology Choice
- TypeScript
- React NextJS
- Redux (redux-toolkit)

# Features
1. Login Screen with email and name inputs. ✅
2. Sender list with sender name and post count ordered by name alphabetically. ✅
3. Clicking on a sender opens that sender's posts in the post list view. ✅
4. Post list where posts are ordered by creation time. ✅
5. Post order buttons to allow choosing most recent first and most recent last ordering for posts list ✅
6. Search box for senders. Any senders whose name do not contain the text entered are hidden ✅
7. Search box for posts. Any posts that do not contain the text entered are hidden ✅
8. Deep-linkable post list. This means that it is possible to enter a URL that directly selects the sender whose posts are shown. ✅
9. Unit test for (4) -> (7) ✅

# Limitations and Thoughts
- Authentication flow:
  Diagram of the application authentication flow 
  ![image](https://user-images.githubusercontent.com/23309848/151069980-a31c87d5-0c3d-44b0-9055-f128adf199ec.png) <br />
  I use client-side authentication in this project. I dont check for token validation when the user first load the page. Instead, I implement an Axios interceptors that dispatch a logout action whenever the response status is 500. The reason is that in the assignment, it does not provide an API to check if token is valid. In a real-life application, a better, more Next JS approach would be using next-auth, which is Next JS official authetication solution. However, this would require more input from the backend side.
- Fetch Posts methods
  Since I am provided with only one endpoint to fetch posts. I come up with the solution that involves using Promise.all for all of the 10 pages. Then I transform all of those 10 responses into one big array and set to store. To me, a better architectural approach for this application is to have one endpoint to fetch all users and one endpoint to fetch posts by user_id. However if this project is to test my frontend skills then I think this assignment is totally understandable.
- Code redability vs Performance
  Example code 
  ![image](https://user-images.githubusercontent.com/23309848/151071896-c3593c86-d8d0-44e8-8ef0-e677e0cd24a6.png) <br />
  In my fetch posts action. I use the declarative way of transforming the response data. Firstly, I map through the responses array from Promise.all. Then I reduce the data to suit my store type. I understand that this is not the most optimized way to manipulate the array, and I can use the imperative way to write a more optimised for loops. However, since this performance issue does not really affect the app overval experiences, and using Array map and reduce functions improve the code readability, I choose to have keep using this declarative way.

# How to use
- Clone project to a locale folder.
- Create a .env file with this value
- NEXT_PUBLIC_CLIENT_ID=your_client_id

# Screenshots

### Login page
![loginpage](https://user-images.githubusercontent.com/23309848/151073370-005f17ae-f3a5-4661-a281-f9d179c7eed8.png)

### Main page
![mainpage](https://user-images.githubusercontent.com/23309848/151073416-8a8af447-7316-4936-bdcb-b239b3018969.png)

### Users and Posts filter
![mainpage with filter](https://user-images.githubusercontent.com/23309848/151073479-7e4c514c-d68b-47ed-a8b7-dbb821bbe21c.png)

### Light house performance
![performance](https://user-images.githubusercontent.com/23309848/151073512-4ef0a82f-0dac-4ae2-acab-5f859abaa860.png)
