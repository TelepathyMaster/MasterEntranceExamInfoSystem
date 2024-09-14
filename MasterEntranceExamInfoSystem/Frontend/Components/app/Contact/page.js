import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Divider} from "@mui/material";

export default function ContactPage(){
    return (
        <Container maxWidth="md">
            <Box sx={{textAlign: "center", m: 3}}>
                <Typography variant="h4">
                    如有需要，请通过以下方式联系我们
                </Typography>
                <Divider sx={{mb: 3}}/>
                <Typography variant="h5" gutterBottom>
                    Tel: 15322301162
                </Typography>
                <Typography variant="h5" gutterBottom>
                    E-mail: r2ywwg@gmail.com
                </Typography>
                <Typography variant="h5" gutterBottom>
                    QQ: 934446238
                </Typography>
            </Box>
        </Container>
    );

}