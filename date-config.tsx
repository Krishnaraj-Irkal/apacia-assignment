import 'moment/locale/en-gb';
import 'antd/es/date-picker/locale/en_GB';

import { ConfigProvider } from "antd";
import enGB from "antd/es/locale/en_GB";
import { ReactNode } from "react";

interface DateConfigProviderProps {
  children: ReactNode;
}

const DateConfigProvider: React.FC<DateConfigProviderProps> = ({ children }) => (
  <ConfigProvider locale={enGB}>{children}</ConfigProvider>
);

export default DateConfigProvider;
