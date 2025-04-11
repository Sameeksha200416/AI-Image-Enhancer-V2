import React from "react";
import ImageUpload from "./ImageUpload";
import ImagePreview from "./ImagePreview";
import {useState} from "react";
import {enhancedImageAPI} from "../utils/enhancedImageApi";
//Assuming you have an API function to enhance the image
const Home = () => {
    const [uploadImage,setuploadImage] = useState(null);
    const [enhancedImage,setEnhancedImage] = useState(null);
    const [loading,setloading] = useState(false);
    
    const UploadImageHandler = async(file) => {
        setuploadImage(URL.createObjectURL(file));
        setloading(true);
        //calling API to enhanced the image
        try{
            //code which may produce error
            const enhancedURL = await enhancedImageAPI(file);
            setEnhancedImage(enhancedURL);
            setloading(false);
        }
        catch(error){
            //code to handle the error which handle the error and show msg
            console.log(error);
            alert("Error while enhancing the image.please try again later.")
        }
    };
    // console.log(enhancedImage.image);

    return (
        <>
            <ImageUpload UploadImageHandler={UploadImageHandler}/>
            <ImagePreview 
            loading={loading} 
            uploaded={uploadImage}
            enhanced={enhancedImage ?.image}
            />
        </>
    );
    }
    
export default Home;