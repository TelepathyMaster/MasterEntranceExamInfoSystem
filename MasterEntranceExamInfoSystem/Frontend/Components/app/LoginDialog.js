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

export default function LoginDialog({loginOpen, handleLoginClose, handleSnackbarOpen, setIsLoggedIn}) {
    const [errorFlag, setErrorFlag] = useState(false);
    const [helpText, setHelpText] = useState('');
    const [field,setField]=useState("");
    const [nullError,setNullError]=useState(false);
    const handleLoginError = () => {
        setErrorFlag(true);
        setHelpText('请检查输入是否正确');
    }
    function handleClose(){
        setErrorFlag(false);
        setNullError(false);
        setHelpText('');
        handleLoginClose();
    }
    function handleChange(e){
        setField(e.target.value);
        if (e.target.validity.valid) {
            setNullError(false);
        } else {
            setNullError(true);
        }
    };
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
                    axios.post('/api/user/auth', objData)
                        .then(function (response) {
                            if (response.data.length) {
                                handleClose();
                                handleSnackbarOpen('success', '登录成功', 1000);
                                setIsLoggedIn(true);
                                cookie.save('userId', response.data[0].id, {path: '/'});
                                cookie.save('username', response.data[0].username, {path: '/'});
                            } else {
                                handleLoginError();
                            }
                        })
                        .catch(function (error) {
                            console.log(error)
                        })
                },
            }}
        >
            <DialogTitle>登录</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    name="username"
                    label="用户名"
                    error={errorFlag||nullError}
                    helperText={nullError?'用户名不能为空':helpText}
                    onChange={handleChange}
                    value={field}
                    required
                    fullWidth
                />
                <PasswordTextField
                    error={errorFlag}
                    helperText={helpText}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>取消</Button>
                <Button type="submit">确认</Button>
            </DialogActions>
        </Dialog>
    );
}
