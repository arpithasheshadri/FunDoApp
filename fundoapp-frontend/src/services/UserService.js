import AxiosService from "./AxiosService";
const axiosService = new AxiosService();

let baseurl = 'http://localhost:8080/api'

class UserService {
    SignUp(url,data){
        return axiosService.postMethod(`${baseurl}${url}`,data);
    }
    SignIn(url,data){
        return axiosService.postMethod(`${baseurl}${url}`,data);
    }
    Forgot(url,data){
        return axiosService.postMethod(`${baseurl}${url}`,data);
    }
    Reset(url,data,config){
        return axiosService.postMethod(`${baseurl}${url}`,data,config);
    }
    addNotes(url,data,config){
        return axiosService.postMethod(`${baseurl}${url}`,data,config);
    }
    displayNotes(url,config){
        return axiosService.getMethod(`${baseurl}${url}`,config);
    
    }
    updateNotes(url,data,config){
        return axiosService.postMethod(`${baseurl}${url}`,data,config);
    }
    archiveNotes(url,data,config){
        return axiosService.postMethod(`${baseurl}${url}`,data,config);
    }
    trashNotes(url,data,config){
        return axiosService.postMethod(`${baseurl}${url}`,data,config);
    }
    searchUser(url,data,config){
        return axiosService.postMethod(`${baseurl}${url}`,data,config);
    }
    addCollaborator(url,data,config){
        return axiosService.postMethod(`${baseurl}${url}`,data,config);
    }
}

export default UserService