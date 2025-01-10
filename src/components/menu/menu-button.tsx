import { Button } from "@mui/material";

export default function MenuButton({ text, action }: { text: string, action: Function }) {

    return (
        <Button
            size="small"
            variant="contained"
            sx={{ fontSize: 11, mr: 1 }} onClick={() => action()}>{text}</Button>
    )
}
