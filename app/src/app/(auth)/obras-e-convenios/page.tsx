import { LineChart } from '@mantine/charts';
import { biaxialData } from '@/app/(auth)/obras-e-convenios/data';
import { getSession } from '@/lib/session';
import { SessionPayload } from '@/types/sessionPayload';
import Template from '@/components/template';

export default async function ObrasConvenios() {

    const session: SessionPayload = await getSession()
    return (
        <Template session={session}>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <LineChart
                    h={300}
                    w={800}
                    data={biaxialData}
                    dataKey="name"
                    withRightYAxis
                    yAxisLabel="uv"
                    rightYAxisLabel="pv"
                    series={[
                        { name: 'uv', color: 'pink.6' },
                        { name: 'pv', color: 'cyan.6', yAxisId: 'right' },
                    ]}
                />
            </div>
        </Template >
    );
}