'use client'
import { IconPhone, IconMail, IconMapPin } from '@tabler/icons-react';

export default function Footer() {
    return (
        < footer className="w-screen bg-blue-600 text-white h-1/12 mt-2 flex justify-between">
            <div className='flex flex-col justify-center'>
                <div className='flex row-auto gap-1'><span>{<IconPhone size={16} stroke={1.5} />}</span>+55 (86) 99490‑9683</div>
                <div className='flex row-auto gap-1'><span>{<IconMail size={16} stroke={1.5} />}</span>gabinete@seplan.pi.gov.br</div>
                <div className='flex row-auto gap-1'><span>{<IconMapPin size={16} stroke={1.5} />}</span>Av. Miguel Rosa, 3190 • Centro/Sul • CEP: 64.001-495 • Teresina-PI</div>
            </div>
        </footer>
    );
}