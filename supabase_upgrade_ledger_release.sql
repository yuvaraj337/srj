-- Sri Rajalakshmi Jewellery app upgrade: customer details, multiple ornaments and release workflow.
-- Run in Supabase SQL Editor while signed into the correct project. Safe to re-run.
ALTER TABLE public.gold_loans ADD COLUMN IF NOT EXISTS customer_address TEXT;
ALTER TABLE public.gold_loans ADD COLUMN IF NOT EXISTS aadhaar_number TEXT;
ALTER TABLE public.gold_loans ADD COLUMN IF NOT EXISTS interest_rate NUMERIC(7,2) NOT NULL DEFAULT 0;
ALTER TABLE public.gold_loans ADD COLUMN IF NOT EXISTS interest_period TEXT NOT NULL DEFAULT 'monthly';
ALTER TABLE public.gold_loans ADD COLUMN IF NOT EXISTS expected_release_date DATE;
ALTER TABLE public.gold_loans ADD COLUMN IF NOT EXISTS actual_release_date DATE;
ALTER TABLE public.gold_loans ADD COLUMN IF NOT EXISTS valuation_amount NUMERIC(12,2) NOT NULL DEFAULT 0;
ALTER TABLE public.gold_loans ADD COLUMN IF NOT EXISTS ornaments JSONB NOT NULL DEFAULT '[]'::jsonb;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname='gold_loans_interest_period_check' AND conrelid='public.gold_loans'::regclass) THEN
    ALTER TABLE public.gold_loans ADD CONSTRAINT gold_loans_interest_period_check CHECK (interest_period IN ('monthly','yearly'));
  END IF;
END $$;
UPDATE public.gold_loans SET ornaments = jsonb_build_array(jsonb_build_object('particulars', COALESCE(ornament_name,''), 'weightG', 0, 'weightMg', 0, 'loanAmount', COALESCE(loan_amount,0), 'valuation', COALESCE(valuation_amount,0))) WHERE ornaments = '[]'::jsonb AND COALESCE(ornament_name,'') <> '';
NOTIFY pgrst, 'reload schema';
