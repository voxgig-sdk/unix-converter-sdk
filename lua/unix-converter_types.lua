-- Typed models for the UnixConverter SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Conversion
---@field input? table
---@field output? table
---@field success? boolean

---@class ConversionLoadMatch
---@field date? string
---@field format? string
---@field timestamp? number
---@field timezone? string

local M = {}

return M
