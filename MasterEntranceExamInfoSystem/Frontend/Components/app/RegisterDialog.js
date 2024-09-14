import axios from "axios";
import cookie from "react-cookies";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import PasswordTextField from "@/app/PasswordTextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import * as React from "react";
import {useState} from "react";

export default function RegisterDialog({loginOpen, handleLoginClose, handleSnackbarOpen, setIsLoggedIn}) {
    const [userError, setUserError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [helpUserText, setUserHelpText] = useState("");
    const [helpPasswordText, setPasswordHelpText] = useState("");
    const [field,setField]=useState("");
    const [nullError,setNullError]=useState(false);
    const handleUserExistedError = () => {
        setUserError(true);
        setUserHelpText('用户名已存在');
        setPasswordError(false);
        setPasswordHelpText('');
    }
    const handlePasswordNotCorrespondError = () => {
        setUserError(false);
        setUserHelpText('');
        setPasswordError(true);
        setPasswordHelpText('再次密码输入不一致');
    }
    function handleChange(e){
        setField(e.target.value);
        if (e.target.validity.valid) {
            setNullError(false);
        } else {
            setNullError(true);
        }
    };

    function handleClose(){
        setUserError(false);
        setNullError(false);
        setUserHelpText('');
        setPasswordError(false);
        setPasswordHelpText('');
        handleLoginClose();
    }

    return (
        <Dialog
            open={loginOpen}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    let objData = {};
                    for (const entry of formData.entries()) {
                        objData[entry[0]] = entry[1];
                    }
                    if (objData.password !== objData.passwordRepeat) {
                        handlePasswordNotCorrespondError();
                    } else {
                        delete objData.passwordRepeat;
                        axios.post('/api/user', objData)
                            .then(function (response) {
                                if (response.data) {
                                    handleClose();
                                    handleSnackbarOpen('success', '注册成功，已登录', 1000);
                                    setIsLoggedIn(true);
                                    cookie.save('userId', response.data.id, {path: '/'});
                                    cookie.save('username', response.data.username, {path: '/'});
                                } else {
                                    handleUserExistedError();
                                }
                            })
                            .catch(function (error) {
                                console.log(error)
                            })
                    }


                },
            }}
        >
            <DialogTitle>注册</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    name="username"
                    label="用户名"
                    error={userError||nullError}
                    helperText={nullError?'用户名不能为空':helpUserText}
                    onChange={handleChange}
                    value={field}
                    required
                    fullWidth
                />
                <PasswordTextField
                    error={passwordError}
                    helperText={helpPasswordText}
                    fullWidth
                />
                <PasswordTextField
                    error={passwordError}
                    helperText={helpPasswordText}
                    placeHolder="请再次输入密码"
                    fullWidth
                    name="passwordRepeat"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>取消</Button>
                <Button type="submit">确认</Button>
            </DialogActions>
        </Dialog>
    );
}
