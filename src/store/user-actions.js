import { userActions } from "./user-slice";

const apiURl = "http://127.0.0.1:8080";
const token = localStorage.getItem("token");
const mainUserId = localStorage.getItem("mainUserId");

export const initializeFollowing = () => {
  return async (dispatch) => {
    const sendToBack = async () => {
      const result = await fetch(
        `${apiURl}/user/get-following-no-detail/` + mainUserId,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (!result.ok) {
        throw new Error("no user found");
      }
      const toJSON = await result.json();
      dispatch(userActions.initializeFollowing(toJSON.user.following));
    };
    try {
      await sendToBack();
    } catch (err) {
      console.log(err);
    }
  };
};

export const addToFollowing = (targetUser) => {
  return async (dispatch) => {
    const sendToBack = async () => {
      const response = await fetch(apiURl + "/user/add-following", {
        method: "PUT",
        body: JSON.stringify({ target: targetUser }),
        headers: {
          "Content-Type": "Application/json",
          Authorization: "Bearer " + token,
        },
      });
      if (!response.ok) {
        throw new Error("Couldn't fetch user");
      }
    };
    try {
      await sendToBack();
      dispatch(userActions.addToFollowing(targetUser));
    } catch (err) {
      console.log(err);
    }
  };
};

export const removeFromFollowing = (targetUser) => {
  return async (dispatch) => {
    const sendToBack = async () => {
      const body = { target: targetUser };
      const response = await fetch(apiURl + "/user/remove-following", {
        method: "DELETE",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "Application/json",
          Authorization: "Bearer " + token,
        },
      });
      if (!response.ok) {
        throw new Error("Couldn't fetch user");
      }
    };
    try {
      await sendToBack();
      dispatch(userActions.removeFromFollowing(targetUser));
    } catch (err) {
      console.log(err);
    }
  };
};
