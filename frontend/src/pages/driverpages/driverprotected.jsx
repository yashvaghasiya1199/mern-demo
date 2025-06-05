import { DriverProtection } from "../../views/protect";
import { UserProtection } from "../../views/protect";
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { errorToast } from '../../componets/toast';
import { useDriverHooks } from '../../hooks/driver.hook';
import { useUserHooks } from '../../hooks/user.hook';

export function DriverProtectionPage({ children }) {
  return <>
  <DriverProtection children={children} />
  </>
}


