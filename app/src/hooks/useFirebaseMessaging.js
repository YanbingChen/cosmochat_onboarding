// src/hooks/useFirebaseMessaging.js
import { useEffect } from "react";
import { messaging, getToken, onMessage } from "../firebase";

const useFirebaseMessaging = () => {
  useEffect(() => {
    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          const token = await getToken(messaging, {
            vapidKey: import.meta.env.VITE_VAPID_KEY,
          });
          console.log("FCM Token:", token);
        } else {
          console.log("Notification permission denied");
        }
      } catch (error) {
        console.error("Error getting notification permission:", error);
      }
    };

    requestPermission();

    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      const { title, body } = payload.notification;
      new Notification(title, { body });
    });
  }, []);
};

export default useFirebaseMessaging;
