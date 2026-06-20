import type { Metadata } from "next";
import SettingsPage from '@/components/views/SettingsPage';

export const metadata: Metadata = {
    title: "Settings",
    robots: { index: false, follow: false },
};

export default function Settings() {
    return <SettingsPage />;
}
