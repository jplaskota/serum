const notificationBox = document.getElementById("notification"),
  notificationText = notificationBox.querySelector("span");

// Define a function to show notifications with optional status (success or error)
export default async function ShowNotification(text, status) {
  notificationBox.style.animation = "none";

  // Set default background color when status is not specified
  notificationBox.style.backgroundColor = "#2d59aa";

  // Change background color based on status (success or error)
  if (status === "success") {
    notificationBox.style.backgroundColor = "#438d43";
  }
  if (status === "error") {
    notificationBox.style.backgroundColor = "#aa2d3e";
  }

  notificationText.innerText = text;

  // Set a timeout to apply the notification animation after a short delay
  setTimeout(() => {
    notificationBox.style.animation =
      "notification 3s ease-in-out .5s forwards";
  }, 10);
}
