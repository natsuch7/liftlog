import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { HelmetProvider } from 'react-helmet-async'
import { Routes, Route } from 'react-router-dom'
import BlogIndex from './pages/blog/index.jsx'
import BenchPressPlateauPeriodization from './pages/blog/articles/BenchPressPlateauPeriodization.jsx'
import BenchPressPlateauCauses from './pages/blog/articles/BenchPressPlateauCauses.jsx'
import SquatDepthHypertrophy from './pages/blog/articles/SquatDepthHypertrophy.jsx'
import SquatDepthMistakes from './pages/blog/articles/SquatDepthMistakes.jsx'
import DeloadSigns from './pages/blog/articles/DeloadSigns.jsx'
import DeloadVsRest from './pages/blog/articles/DeloadVsRest.jsx'
import BlockPeriodizationGuide from './pages/blog/articles/BlockPeriodizationGuide.jsx'
import SquatAccessoryExercises from './pages/blog/articles/SquatAccessoryExercises.jsx'
import OvertrainingRecovery from './pages/blog/articles/OvertrainingRecovery.jsx'
import Big3TrainingFrequency from './pages/blog/articles/Big3TrainingFrequency.jsx'
import PeriodizationTrainingGuide from './pages/blog/articles/PeriodizationTrainingGuide.jsx'
import WeeklyVolumeOptimization from './pages/blog/articles/WeeklyVolumeOptimization.jsx'

export function render(url) {
  const helmetContext = {}
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <Routes>
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/bench-press-plateau-periodization" element={<BenchPressPlateauPeriodization />} />
          <Route path="/blog/bench-press-plateau-causes" element={<BenchPressPlateauCauses />} />
          <Route path="/blog/squat-depth-hypertrophy" element={<SquatDepthHypertrophy />} />
          <Route path="/blog/squat-depth-misconceptions" element={<SquatDepthMistakes />} />
          <Route path="/blog/deload-signs-and-methods" element={<DeloadSigns />} />
          <Route path="/blog/deload-vs-rest-difference" element={<DeloadVsRest />} />
          <Route path="/blog/block-periodization-beginner-guide" element={<BlockPeriodizationGuide />} />
          <Route path="/blog/squat-plateau-accessory-exercises" element={<SquatAccessoryExercises />} />
          <Route path="/blog/overtraining-recovery-method" element={<OvertrainingRecovery />} />
          <Route path="/blog/bench-squat-deadlift-training-frequency" element={<Big3TrainingFrequency />} />
          <Route path="/blog/periodization-training-guide" element={<PeriodizationTrainingGuide />} />
          <Route path="/blog/weekly-volume-sweet-spot" element={<WeeklyVolumeOptimization />} />
        </Routes>
      </StaticRouter>
    </HelmetProvider>
  )
  const { helmet } = helmetContext
  return { html, helmet }
}
