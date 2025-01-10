import { Paper, styled } from "@mui/material";
import { ReactNode } from "react";

export default function StyledItem({ children }: { children: ReactNode | ReactNode[] }) {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        ...theme.applyStyles('dark', {
            backgroundColor: theme.palette.background.paper,
        }),
    }));

    return (
        <Item>{children}</Item>
    )
}