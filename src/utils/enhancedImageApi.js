
const API_KEY = "wxqodoyfh71801jez";
const BASE_URL = "https://techhk.aoscdn.com";
import axios from "axios";
const MAXIMUM_RETRIES = 20;

export const enhancedImageAPI = async(file) => {
    try{
        //uploading the imagefile
        const taskId = await uploadingImage(file);
        console.log("Image Uploaded successfully,Task ID:", taskId);

        //fetching the uploading imagefile
        const enhancedImageData = await PollForEnhancedImage(taskId);
        console.log("Enhanced Image Data:", enhancedImageData);

        // console.log(enhancedImageData);
        return enhancedImageData;
    }
    catch(error){
        console.log("Error enhancing image:",error.message)
    }
};

const uploadingImage = async(file) => {
    const formData = new FormData();
    formData.append("image_file",file);

    const {data} = await axios.post(`${BASE_URL}/api/tasks/visual/scale`,
        formData,{
        headers:{
            "Content-Type":"multipart/form-data",
            "X-API-KEY": API_KEY,
        },
    }
)
    if(!data?.data?.task_id){
        throw new Error("Failed to upload image! task id not found");
    }
    return data.data.task_id;
    console.log(data);
    // return taskId;
}
const fetchEnhancedImage = async(taskId) => {
    const {data} = await axios.get(`${BASE_URL}/api/tasks/visual/scale/${taskId}`,
    {
        headers:{
            "X-API-KEY": API_KEY,
        },
    }
)
if(!data?.data){
    throw new Error("Failed to fetch enhanced image! Image not found");
}
return data.data;
    //"/api/tasks/visual/scale/{task_id}" --GET API
}

const PollForEnhancedImage = async(taskId,retries = 0) =>{
    const result = await fetchEnhancedImage(taskId);

    if(result.state === 4){
        console.log(`Processing...(${retries}/${MAXIMUM_RETRIES})`);

        if(retries >= MAXIMUM_RETRIES){
            throw new Error("Max retries reached. Please try again later.");
        }

        //wait for 2 seconds before polling again
        await new Promise((resolve) => setTimeout(resolve,2000));

        return PollForEnhancedImage(taskId,retries+1);  
        
    }
    console.log("Enhanced Image URL:",result);
    return result;
}

//"3cd831c3-b346-47d3-ace4-c73de1174566" --taskId

// data
// : 
// task_id
// : 
// "3cd831c3-b346-47d3-ace4-c73de1174566"
// [[Prototype]]
// : 
// Object
// message
// : 
// "success"
// status
// : 
// 200