import Grid from "@mui/material/Grid2"
import StyledItem from "./styled-item"

export default function MenuSection({ text }: { text: string }) {

    return (
        <Grid size={12} style={{ paddingBottom: 10 }}>
            <StyledItem>{text}</StyledItem>
        </Grid>
    )
}