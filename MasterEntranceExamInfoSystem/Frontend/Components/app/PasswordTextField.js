'use client';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {FormControl, FormHelperText, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {useState} from "react";

export default function PasswordTextField({error = false, helperText = '', fullWidth = false, name='password', placeHolder=''}) {
    const [showPassword, setShowPassword] = useState(false);
    const [field,setField]=useState("");
    const [nullError,setNullError]=useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    function handleChange(e){
        setField(e.target.value);
        if (e.target.validity.valid) {
            setNullError(false);
        } else {
            setNullError(true);
        }
    };
    return (
        <FormControl
            variant="outlined"
            fullWidth={fullWidth}
            margin="dense"
            error={error||nullError}
        >
            <InputLabel>密码</InputLabel>
            <OutlinedInput
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                    </InputAdornment>
                }
                value={field}
                placeholder={placeHolder}
                onChange={handleChange}
                name={name}
                label={name}
                required
            />
            <FormHelperText error={error||nullError}>
                {nullError?
                    '密码不能为空':
                    helperText}
            </FormHelperText>
        </FormControl>
    );
}