import React from "react";
import {
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  stepConnectorClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Check from '@mui/icons-material/Check';
import type { StepIconProps } from '@mui/material/StepIcon';
import styles from "../../Login/Login.module.css";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-38%)',
    right: 'calc(62%)'
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#7245A9',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#7245A9',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: '#12213090',
    borderTopWidth: 3,
    borderRadius: 1,
    ...(theme.applyStyles && theme.applyStyles('dark', {
      borderColor: theme.palette.grey[800],
    })),
  },
}));

// Custom step icon 
const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: '#12213090',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    '& .QontoStepIcon-completedIcon': {
      color: '#7245A9',
      zIndex: 1,
      fontSize: 18,
    },
    '& .QontoStepIcon-circle': {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
    ...(theme.applyStyles && theme.applyStyles('dark', {
      color: theme.palette.grey[700],
    })),
    ...(ownerState.active && {
      color: '#7245A9',
    }),
  }),
);

// Custom step icon component
function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;
  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

interface CustomStepperProps {
  activeStep: number;
  steps: string[];
  className?: string;
}

const CustomStepper: React.FC<CustomStepperProps> = ({ activeStep, steps, className }) => {
  return (
    <Stepper 
      alternativeLabel 
      activeStep={activeStep} 
      connector={<QontoConnector />} 
      className={className || `${activeStep > 0 ? styles.stepper_transition : styles.stepper}`}
    >
      {steps.map((label, index) => (
        <Step key={index}>
          <StepLabel StepIconComponent={QontoStepIcon}>{""}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default CustomStepper;