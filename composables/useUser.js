// Import the 'useState' function from the '#app' library.
import {useState} from '#app';

// Import the 'User' type from the '@auth0/auth0-spa-js' library.
import {User} from '@auth0/auth0-spa-js';

// Define a function that uses 'useState'
// to create a state variable of type 'User'.
export default function() {
  // Use 'useState' to create a state variable named 'user'.
  // The second argument is a function that returns the initial
  // value of 'user' (in this case, 'null').
  return useState<User>('user', () => null);
}
