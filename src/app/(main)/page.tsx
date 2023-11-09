import { promises as fs } from 'fs';
import { Agenda } from '@/components/Agenda';

export default async function Home() {
    const file = await fs.readFile(process.cwd() + '/public/agenda.json', 'utf8');
    const agendaTracks = JSON.parse(file);
  return (
    <>
      <Agenda agendaTracks={agendaTracks}/>
    </>
  )
}
