import { useState } from 'react'
import { Sidebar, type ViewId } from './components/Sidebar'
import { WhyWorkflow } from './screens/WhyWorkflow'
import { ControlTower } from './screens/ControlTower'
import { ExceptionLedger } from './screens/ExceptionLedger'
import { ExceptionDetail } from './screens/ExceptionDetail'
import { AgentOrchestration } from './screens/AgentOrchestration'
import { ApprovalFlow } from './screens/ApprovalFlow'
import { EvaluationSimulator } from './screens/EvaluationSimulator'
import { RoadmapRoi } from './screens/RoadmapRoi'
import { ExceptionTaxonomy } from './screens/ExceptionTaxonomy'
import { HERO_EXCEPTION_ID } from './data/exceptions'

export default function App() {
  const [view, setView] = useState<'why' | ViewId>('why')
  const [selectedExceptionId, setSelectedExceptionId] = useState<string>(HERO_EXCEPTION_ID)

  const openException = (id: string) => {
    setSelectedExceptionId(id)
    setView('detail')
  }

  if (view === 'why') {
    return <WhyWorkflow onEnter={() => setView('tower')} />
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar active={view} onNavigate={setView} />
      <main className="min-w-0 flex-1 overflow-x-hidden pt-6 pb-6 sm:px-6 lg:px-8">
        {view === 'tower' && <ControlTower onOpenException={openException} />}
        {view === 'ledger' && <ExceptionLedger onOpenException={openException} />}
        {view === 'detail' && (
          <ExceptionDetail
            exceptionId={selectedExceptionId}
            onBack={() => setView('ledger')}
            onOpenAgents={() => setView('agents')}
          />
        )}
        {view === 'agents' && (
          <AgentOrchestration
            exceptionId={selectedExceptionId}
            onBack={() => setView('detail')}
            onOpenApproval={() => setView('approval')}
          />
        )}
        {view === 'approval' && (
          <ApprovalFlow
            exceptionId={selectedExceptionId}
            onBack={() => setView('detail')}
            onOpenEval={() => setView('eval')}
          />
        )}
        {view === 'eval' && <EvaluationSimulator onOpenRoadmap={() => setView('roadmap')} />}
        {view === 'roadmap' && <RoadmapRoi />}
        {view === 'taxonomy' && <ExceptionTaxonomy />}
      </main>
    </div>
  )
}
