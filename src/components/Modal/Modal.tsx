import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { FC, ReactNode } from 'react'
import { SxProps, Theme } from '@mui/material'

const style: SxProps<Theme> = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  textAlign: 'center',
  color: 'red',
  textTransform: 'uppercase',
}

interface IModalProps {
  open: boolean
  close: () => void
  children: ReactNode
  sx?: SxProps<Theme>
  buttonChildren: ReactNode
}

export const TransitionsModal: FC<IModalProps> = ({
  open,
  buttonChildren,
  sx,
  close,
  children,
}) => {
  return (
    <div>
      <Modal
        open={open}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={{ ...style, ...sx }}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {children}
            </Typography>
            <Button onClick={close}>{buttonChildren}</Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
