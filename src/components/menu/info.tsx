import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Link, Typography } from "@mui/material";

export default function Info({ open, setOpen }: { open: boolean, setOpen: Function }) {

    return (
        <Dialog
            open={open}>
            <DialogTitle>
                Good to know
            </DialogTitle>
            <DialogContent>
                <DialogContent>
                    <Typography>
                        I added  <Link href="https://www.blender.org/" target="_blank">Blender</Link> style shortcuts:
                    </Typography>
                    <ul>
                        <li>x : delete selected Mesh</li>
                        <li>s : save curve (in your browser local storage)</li>
                    </ul>
                    <Typography>
                        Also;<br />
                        Made with love. If you like it consider to star the <Link href="https://github.com/appeltje-c/curvature" target="_blank">repo</Link> 💙
                        <br />
                        Taking requests as well 👉 <Link href="https://github.com/appeltje-c/curvature/issues" target="_blank">here</Link>
                    </Typography>
                </DialogContent>
            </DialogContent>
            <DialogActions>
                <Button size="small" sx={{ fontSize: 11 }} variant="contained" onClick={() => setOpen(false)}>
                    Got it!
                </Button>
            </DialogActions>
        </Dialog>
    )
}