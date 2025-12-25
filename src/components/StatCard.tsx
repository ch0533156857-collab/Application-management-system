interface StatCardProps {
    title: string;
    value: number;
    icon: React.ReactNode;
}

export function StatCard({ title, value, icon }: StatCardProps) {
    return (
    <div className="stat-card">
            <div>
                <span className="stat-card-icon">{icon}</span>
                <div>
                    <p className="stat-card-title">{title}</p>
                    <p className="stat-card-value">{value}</p>
                </div>
            </div>
        </div>
    );
}