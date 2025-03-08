
import React from "react";

interface FooterProps {
  lastUpdated: string;
}

const Footer = ({ lastUpdated }: FooterProps) => {
  return (
    <div className="mt-8 text-center text-gray-500 text-sm">
      <p>© Copyright 2021 - 2025. All Rights Reserved by Direktorat SISINFO</p>
      <p className="mt-2">Data diperbarui {new Date().toLocaleString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })}</p>
    </div>
  );
};

export default Footer;
