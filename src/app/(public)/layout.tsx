
export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div 
            className="w-full min-h-screen"
            style={{
                backgroundImage: 'url(/assets/cloud-background.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed'
            }}
        >
            {children}
        </div>
    );
}
