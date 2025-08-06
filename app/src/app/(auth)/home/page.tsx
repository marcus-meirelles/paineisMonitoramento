import { RadarChart, ScatterChart, RadialBarChart, BarChart } from '@mantine/charts';
import { data, data2, data3, data4 } from '@/app/(auth)/home/data';
import { SessionPayload } from '@/types/sessionPayload';
import Template from '@/components/template';
import { getSession } from '@/lib/session';
import { Grid, GridCol } from '@mantine/core';

export default async function Home() {

  const session: SessionPayload = await getSession()
  return (
    <Template session={session}>
      <Grid gutter={{ }}>
        <GridCol span={6}>
          <RadarChart
            h={280}
            data={data}
            dataKey="product"
            withPolarRadiusAxis
            series={[
              { name: 'Sales January', color: 'lime.4', opacity: 0.1 },
              { name: 'Sales February', color: 'cyan.4', opacity: 0.1 },
            ]}
          />
        </GridCol>
        <GridCol span={6}>
          <BarChart
            h={300}
            data={data4}
            dataKey="month"
            type="stacked"
            series={[
              { name: 'Smartphones', color: 'violet.6' },
              { name: 'Laptops', color: 'blue.6' },
              { name: 'Tablets', color: 'teal.6' },
            ]}
          />
        </GridCol>
        <GridCol span={6}>
          <ScatterChart
            h={350}
            w={800}
            data={data2}
            dataKey={{ x: 'age', y: 'BMI' }}
            xAxisLabel="Age"
            yAxisLabel="BMI"
            withLegend
            legendProps={{ verticalAlign: 'bottom', height: 20 }}
          />
        </GridCol>
        <GridCol span={6}>
          <RadialBarChart data={data3} dataKey="value" h={220} />
        </GridCol>
      </Grid>
    </Template >
  );
}
