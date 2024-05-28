import axios from 'axios';
import { Profile, profileApiDetail } from '../Api';
import toast from 'react-hot-toast';

export const UpdateProfile = async (data) => {
    try {
        const toastId = toast.loading("Loading...");
        const response = await axios.put(profileApiDetail.updateProfileData, { data });
        toast.dismiss(toastId);

        if (response) {
            return response;
        }
    } catch (error) {
        console.error("error", error);
        toast.error(`error occurred: ${error}`);
    }
};

export const UpdateProfilePicture = async (file,Email) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'at3gf6rj');
        formData.append('folder', 'Copartner');
        
        const response = await axios.post("https://api.cloudinary.com/v1_1/dtd8peoae/image/upload", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        const sendSecureUrlToBac = await axios.put(profileApiDetail.UpdateProfilePic, { secure_url: response.data.secure_url,Email });
        if (sendSecureUrlToBac) {
            return sendSecureUrlToBac;
        }
    } catch (error) {
        console.error("error", error);
        toast.error(`error occurred: ${error}`);
    }
};

export const UpdateResume = async (file, Email) => {
    try {
        const toastId = toast.loading("Loading...");
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'akr17cvp');
        formData.append('folder', 'Copartner');
        const response = await axios.post("https://api.cloudinary.com/v1_1/dtd8peoae/image/upload", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        const sendSecureUrlToBac = await axios.put(profileApiDetail.updateResume, { secure_url: response.data.secure_url,Email });
        toast.dismiss(toastId);
        if (sendSecureUrlToBac) {
            return sendSecureUrlToBac;
        }
    } catch (error) {
        console.error("error", error);
        toast.error(`error occurred: ${error}`);
    }
};

export const DeleteProfile = async (Email) => {
    try {
        const response = await axios.post(profileApiDetail.deleteProfile, { Email });
        if (response) {
            toast.success("Account Deleted SuccessFully")
            return response;
        }
    } catch (error) {
        console.error("error", error);
        toast.error(`error occurred: ${error}`);
    }
};

export const UpdatePassword = async (Email, newPassword) => {
    try {
        const response = await axios.post(profileApiDetail.updatepassword, { Email, newPassword });
        if (response) {
            return response;
        }
    } catch (error) {
        console.error("error", error);
        toast.error(`error occurred: ${error}`);
    }
};

export const GetUserDetail = async (Email) => {
    try {
        console.log("Ema",Email)
        const response = await axios.post(profileApiDetail.profileInfo, {Email});
        if (response) {
            return response;
        }
    } catch (error) {
        console.error("error", error);
        toast.error(`error occurred: ${error}`);
    }
};
